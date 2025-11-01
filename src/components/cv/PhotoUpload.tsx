import { useState, useCallback, memo } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { Upload, X, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface PhotoUploadProps {
  value?: string;
  onChange: (value: string | null) => void;
}

// Security constants
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];
const MAX_DIMENSIONS = { width: 2000, height: 2000 };
const COMPRESS_MAX_SIZE = 600; // Resize to max 600x600 for < 100KB target
const TARGET_SIZE_KB = 100; // Target file size in KB

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.src = url;
  });

const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: Area
): Promise<string> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  // Compress/resize if too large
  let width = pixelCrop.width;
  let height = pixelCrop.height;

  if (width > COMPRESS_MAX_SIZE || height > COMPRESS_MAX_SIZE) {
    if (width > height) {
      height = (height / width) * COMPRESS_MAX_SIZE;
      width = COMPRESS_MAX_SIZE;
    } else {
      width = (width / height) * COMPRESS_MAX_SIZE;
      height = COMPRESS_MAX_SIZE;
    }
  }

  canvas.width = width;
  canvas.height = height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    width,
    height
  );

  // Iterative compression to achieve < 100KB target
  const compressToTarget = async (quality: number): Promise<string> => {
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Failed to create image blob'));
            return;
          }
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.onerror = () => {
            reject(new Error('Failed to read image'));
          };
        },
        'image/jpeg',
        quality
      );
    });
  };

  // Try different quality levels to achieve target size
  const qualityLevels = [0.75, 0.65, 0.55, 0.45];
  const targetBytes = TARGET_SIZE_KB * 1024;

  for (const quality of qualityLevels) {
    const result = await compressToTarget(quality);
    const sizeInBytes = Math.ceil((result.length * 3) / 4); // Approximate base64 to bytes

    if (sizeInBytes <= targetBytes) {
      return result;
    }
  }

  // If still too large, return the lowest quality version
  return compressToTarget(0.45);
};

export const PhotoUpload = memo(function PhotoUpload({ value, onChange }: PhotoUploadProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];

    // 1. Validate file type (MIME type)
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error('Nieprawidłowy typ pliku', {
        description: 'Dozwolone: JPG, PNG, WebP'
      });
      e.target.value = ''; // Reset input
      return;
    }

    // 2. Validate file extension (additional check)
    const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(fileExt)) {
      toast.error('Nieprawidłowe rozszerzenie pliku', {
        description: 'Dozwolone: .jpg, .png, .webp'
      });
      e.target.value = '';
      return;
    }

    // 3. Validate file size
    if (file.size > MAX_FILE_SIZE) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      const maxMB = (MAX_FILE_SIZE / (1024 * 1024)).toFixed(0);
      toast.error('Plik za duży', {
        description: `Rozmiar: ${sizeMB}MB. Maksymalnie: ${maxMB}MB`
      });
      e.target.value = '';
      return;
    }

    // 4. Verify file is actually an image (not renamed executable)
    try {
      const bitmap = await createImageBitmap(file);

      // 5. Validate dimensions
      if (bitmap.width > MAX_DIMENSIONS.width || bitmap.height > MAX_DIMENSIONS.height) {
        toast.error('Zdjęcie za duże', {
          description: `Maksymalny rozmiar: ${MAX_DIMENSIONS.width}x${MAX_DIMENSIONS.height}px`
        });
        e.target.value = '';
        return;
      }

      // All validations passed - load the image
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImageSrc(reader.result as string);
        setIsOpen(true);
      });
      reader.addEventListener('error', () => {
        toast.error('Błąd odczytu pliku');
      });
      reader.readAsDataURL(file);

    } catch (error) {
      toast.error('Nieprawidłowy plik obrazu', {
        description: 'Nie można odczytać pliku jako obrazu'
      });
      e.target.value = '';
    }
  };

  const handleCropSave = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);

      // Calculate final size after crop/compression (base64 to bytes)
      const sizeInBytes = Math.ceil((croppedImage.length * 3) / 4);
      const sizeInKB = Math.round(sizeInBytes / 1024);

      onChange(croppedImage);
      setIsOpen(false);
      setImageSrc(null);
      setCrop({ x: 0, y: 0 });
      setZoom(1);

      // Show success with size info
      if (sizeInKB <= TARGET_SIZE_KB) {
        toast.success('Zdjęcie dodane', {
          description: `Rozmiar: ${sizeInKB}KB (zoptymalizowane)`
        });
      } else {
        toast.success('Zdjęcie dodane', {
          description: `Rozmiar: ${sizeInKB}KB`
        });
      }
    } catch (e) {
      console.error('Error cropping image:', e);
      toast.error('Błąd przetwarzania zdjęcia');
    }
  };

  const handleRemove = () => {
    onChange(null);
  };

  const handleCancel = () => {
    setIsOpen(false);
    setImageSrc(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        {value ? (
          <div className="relative">
            <img
              src={value}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-primary shadow-lg"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 h-8 w-8 rounded-full shadow-md"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border-4 border-dashed border-primary/30 flex items-center justify-center">
            <Camera className="h-12 w-12 text-primary/40" />
          </div>
        )}

        <div className="flex-1">
          <label htmlFor="photo-upload">
            <div className="inline-flex">
              <Button
                type="button"
                variant="outline"
                className="border-2 border-primary hover:bg-primary/10 hover:border-primary"
                onClick={() => document.getElementById('photo-upload')?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                {value ? 'Zmień zdjęcie' : 'Dodaj zdjęcie'}
              </Button>
            </div>
          </label>
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <p className="text-sm text-muted-foreground mt-2">
            Zalecane: kwadratowe, min. 400x400px, max 5MB
            <br />
            <span className="text-xs">Zdjęcie zostanie automatycznie skompresowane do ~{TARGET_SIZE_KB}KB</span>
          </p>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-gradient">Przytnij zdjęcie</DialogTitle>
          </DialogHeader>

          <div className="relative w-full h-96 bg-muted rounded-lg overflow-hidden">
            {imageSrc && (
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Powiększenie</label>
            <input
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-primary to-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
            >
              Anuluj
            </Button>
            <Button
              type="button"
              className="bg-gradient-to-r from-primary to-secondary hover:shadow-glow"
              onClick={handleCropSave}
            >
              Zapisz zdjęcie
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
});
