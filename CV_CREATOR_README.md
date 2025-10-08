# FOMO.cvcreator - CV Creator Documentation

## ✅ FAZA 1 - COMPLETED

### Features Implemented

#### 🎯 Core Functionality (100% Working)
- ✅ **PDF Export** - Fully functional, professional formatting
- ✅ **DOCX Export** - Fully functional, Microsoft Word compatible
- ✅ **Auto-save** - Local storage with auto-save every 2 seconds
- ✅ **Form Sections**:
  - Personal Info (name, email, phone, address, LinkedIn, portfolio)
  - Experience (position, company, dates, description, achievements)
  - Education (degree, field, school, GPA, achievements)
  - Skills (categorized: technical, soft, language, other)
  - Languages (with proficiency levels A1-C2, native)

#### 🤖 AI Features (Prepared for FAZA 2)
- ⏳ **AI Suggestion Buttons** - Disabled with "Coming Soon" tooltips
- ⏳ **AI Utils** - Commented code ready to uncomment
- ⏳ **Functions prepared**:
  - Generate professional summary
  - Improve job descriptions
  - Generate achievement bullet points
  - Suggest relevant skills
  - ATS optimization analysis

### File Structure

```
src/
├── pages/
│   └── CVCreator.tsx              # Main CV Creator page with export buttons
├── components/cv/
│   ├── forms/
│   │   ├── PersonalInfoForm.tsx   # Personal info with AI button
│   │   ├── ExperienceSection.tsx
│   │   ├── EducationSection.tsx
│   │   ├── SkillsManager.tsx
│   │   └── LanguagesManager.tsx
│   ├── AISuggestionButton.tsx     # Reusable AI button component (disabled)
│   ├── CVSectionNavigation.tsx
│   └── CVPreviewPlaceholder.tsx
├── stores/
│   └── cvStore.ts                 # Zustand store for CV data
├── types/
│   └── cv.ts                      # TypeScript interfaces
├── utils/
│   ├── cvExport/
│   │   ├── pdfExport.ts           # PDF generation (jsPDF)
│   │   └── docxExport.ts          # DOCX generation (docx)
│   └── aiSuggestions.ts           # AI functions (commented)
└── lib/
    └── cvStorage.ts               # LocalStorage utilities
```

### How to Use

#### For Users:
1. Navigate to `/cv-creator`
2. Fill in your information in each section
3. Click **"Pobierz CV"** button in header
4. Choose format: **PDF** or **DOCX**
5. File downloads automatically with your name

#### Export Features:
- **PDF**:
  - Professional formatting
  - Purple accent colors (#8B5CF6)
  - Automatic page breaks
  - Footer with generation date

- **DOCX**:
  - Microsoft Word compatible
  - Editable format
  - Professional styling
  - Section headings with borders

### FAZA 2 - Enabling AI Features

When you're ready to add AI:

1. **Get OpenAI API Key**:
   - Go to https://platform.openai.com/api-keys
   - Create new API key

2. **Add to Environment**:
   ```bash
   # Create .env file
   cp .env.example .env

   # Add your key:
   VITE_OPENAI_API_KEY=sk-your-key-here
   VITE_ENABLE_AI_FEATURES=true
   ```

3. **Uncomment AI Code**:
   - Open `src/utils/aiSuggestions.ts`
   - Uncomment all functions
   - Install OpenAI SDK: `npm install openai`

4. **AI Features Will Enable**:
   - ✨ Generate professional summary from experience/education
   - ✨ Improve job descriptions with action verbs
   - ✨ Generate achievement bullet points (STAR method)
   - ✨ Suggest relevant skills for position
   - ✨ ATS optimization analysis with score

### Dependencies

```json
{
  "jspdf": "^2.x.x",           // PDF generation
  "jspdf-autotable": "^3.x.x", // Tables in PDF
  "docx": "^8.x.x",            // DOCX generation
  "file-saver": "^2.x.x",      // File download
  "zustand": "^4.x.x"          // State management (already installed)
}
```

### Technical Notes

#### PDF Export (`pdfExport.ts`):
- Uses jsPDF library
- Custom formatting with purple theme
- Automatic pagination
- Supports Polish characters (UTF-8)
- Emoji support for contact icons

#### DOCX Export (`docxExport.ts`):
- Uses docx library
- Microsoft Word compatible
- Paragraph and heading styles
- Border styling for sections
- Bullet points for achievements

#### AI Integration:
- OpenAI GPT-3.5-turbo (cost-effective)
- Browser-side implementation (demo only)
- **Production**: Move to backend for security
- Each function has specific prompts optimized for CV writing

### Security Notes

⚠️ **IMPORTANT for Production**:
- Current AI implementation uses `dangerouslyAllowBrowser: true`
- This is OK for demo/development
- **For production**: Create backend API endpoint
- Never expose API keys in frontend bundle
- Use environment variables + backend proxy

### Troubleshooting

**AI buttons not working?**
- Check if `.env` file exists
- Verify `VITE_OPENAI_API_KEY` is set
- Restart dev server after adding env vars
- Check browser console for errors

**Export not working?**
- Check browser console for errors
- Ensure CV has at least personal info filled
- Try different browser (Chrome recommended)
- Check file download permissions

**Styles look broken?**
- Clear browser cache
- Check if Tailwind CSS is compiling
- Verify all components are imported correctly

### Future Enhancements (Ideas)

- [ ] Multiple CV templates/themes
- [ ] Live preview while editing
- [ ] Import CV from LinkedIn
- [ ] Cloud storage for CVs
- [ ] Share CV via link
- [ ] ATS score visualization
- [ ] Cover letter generator
- [ ] Job application tracker integration

### Support

For issues or questions:
- Check browser console for errors
- Review this documentation
- Check `.env.example` for correct format
- Ensure all npm packages are installed

---

**Made with ❤️ for FOMO Jobs**
Generated with [Claude Code](https://claude.com/claude-code)
