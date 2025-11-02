import { memo, Suspense, lazy } from 'react';
import { getSampleDataForTemplate } from '@/lib/sampleCVData';

interface TemplatePreviewProps {
  templateId: string;
}

// Lazy load templates
const ATSTemplate = lazy(() => import('../cv-creator/templates/ATSTemplate'));
const ExecutiveTemplate = lazy(() => import('../cv-creator/templates/ExecutiveTemplate'));
const ModernTemplate = lazy(() => import('../cv-creator/templates/ModernTemplate'));
const ProfessionalTemplate = lazy(() => import('../cv-creator/templates/ProfessionalTemplate'));
const MinimalistTemplate = lazy(() => import('../cv-creator/templates/MinimalistTemplate'));
const ClassicTemplate = lazy(() => import('../cv-creator/templates/ClassicTemplate'));
const TechTemplate = lazy(() => import('../cv-creator/templates/TechTemplate'));
const CreativeTemplate = lazy(() => import('../cv-creator/templates/CreativeTemplate'));
const AcademicTemplate = lazy(() => import('../cv-creator/templates/AcademicTemplate'));

/**
 * TemplatePreview - Renders a scaled-down preview of a CV template
 *
 * This component renders the actual template with sample data,
 * scaled down to fit in the gallery card.
 */
export const TemplatePreview = memo<TemplatePreviewProps>(({ templateId }) => {
  const sampleData = getSampleDataForTemplate(templateId);
  const { primaryColor, secondaryColor } = sampleData.customization;

  // Select the appropriate template component
  const renderTemplate = () => {
    switch (templateId) {
      case 'ats':
        return <ATSTemplate data={sampleData} />;
      case 'executive':
        return <ExecutiveTemplate data={sampleData} primaryColor={primaryColor} secondaryColor={secondaryColor} />;
      case 'modern':
        return <ModernTemplate data={sampleData} primaryColor={primaryColor} secondaryColor={secondaryColor} />;
      case 'professional':
        return <ProfessionalTemplate data={sampleData} primaryColor={primaryColor} secondaryColor={secondaryColor} />;
      case 'minimalist':
        return <MinimalistTemplate data={sampleData} primaryColor={primaryColor} secondaryColor={secondaryColor} />;
      case 'classic':
        return <ClassicTemplate data={sampleData} primaryColor={primaryColor} secondaryColor={secondaryColor} />;
      case 'tech':
        return <TechTemplate data={sampleData} primaryColor={primaryColor} secondaryColor={secondaryColor} />;
      case 'creative':
        return <CreativeTemplate data={sampleData} primaryColor={primaryColor} secondaryColor={secondaryColor} />;
      case 'academic':
        return <AcademicTemplate data={sampleData} primaryColor={primaryColor} secondaryColor={secondaryColor} />;
      default:
        return <ModernTemplate data={sampleData} primaryColor={primaryColor} secondaryColor={secondaryColor} />;
    }
  };

  return (
    <div
      className="relative w-full h-full bg-white rounded-lg overflow-hidden shadow-inner"
      style={{
        transform: 'scale(0.135)',
        transformOrigin: 'top left',
        width: '740%', // 100 / 0.135 ≈ 740
        height: '740%',
      }}
    >
      <Suspense fallback={
        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
      }>
        {renderTemplate()}
      </Suspense>
    </div>
  );
});

TemplatePreview.displayName = 'TemplatePreview';
