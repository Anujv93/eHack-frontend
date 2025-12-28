# Strapi Component Schema Documentation

All schemas are designed to avoid deep population - no nested repeatable components.

---

## React Component: CourseDetails (Tabbed View)

The `CourseDetails` component combines 4 tabs into a single reusable component:
- **What You'll Learn** - Grid of learning topic cards
- **Learning Framework** - Timeline of learning steps
- **Course Outline** - Accordion-based module list
- **Exam Details** - Two-column exam and certification info

### Import
```tsx
import { CourseDetails, type CourseDetailsProps } from "@/components/global";
```

### Props Interface
```tsx
interface CourseDetailsProps {
    learnItems?: LearnItem[];        // What You'll Learn cards
    frameworkSteps?: FrameworkStep[]; // Learning Framework timeline
    courseTitle?: string;             // Title for Course Outline tab
    courseModules?: CourseModule[];   // Accordion modules
    examInfo?: ExamInfo;              // Exam info card
    certificationInfo?: CertificationInfo; // Cert details card
    defaultTab?: "learn" | "framework" | "outline" | "exam";
}
```

### Type Definitions
```tsx
interface LearnItem {
    id: number;
    number: string;       // "01", "02", etc.
    title: string;
    description: string;
    tags: string[];       // ["AWS", "Azure", "GCP"]
    accentColor?: string; // Top border color
}

interface FrameworkStep {
    id: number;
    number: number;       // 1, 2, 3, 4
    title: string;        // "Learn", "Practice", "Certify", "Excel"
    description: string;
}

interface CourseModule {
    id: number;
    moduleNumber: string; // "Module 01"
    moduleName: string;
    description: string;
    keyTopics: string;    // Comma-separated topics
}

interface ExamInfo {
    examCode: string;
    numberOfQuestions: string;
    duration: string;
    format: string;
    passingScore: string;
    delivery: string;
}

interface CertificationInfo {
    validity: string;
    recognition: string;
    retakePolicy: string;
    examVoucher: string;
    proctoring: string;
    continuingEducation: string;
}
```

### Usage Example
```tsx
<CourseDetails
    defaultTab="outline"
    learnItems={[
        {
            id: 1,
            number: "01",
            title: "Multi-Cloud Security",
            description: "Master security across AWS, Azure, and GCP.",
            tags: ["AWS", "Azure", "GCP"],
        },
        // ... more items
    ]}
    frameworkSteps={[
        { id: 1, number: 1, title: "Learn", description: "10 comprehensive modules..." },
        { id: 2, number: 2, title: "Practice", description: "50%+ hands-on training..." },
        { id: 3, number: 3, title: "Certify", description: "Take the exam..." },
        { id: 4, number: 4, title: "Excel", description: "Join 77,000+ professionals..." },
    ]}
    courseTitle="Cloud Security Course Outline"
    courseModules={[
        {
            id: 1,
            moduleNumber: "Module 01",
            moduleName: "Introduction to Cloud Security",
            description: "Understand cloud fundamentals...",
            keyTopics: "Cloud Computing, Service Models, Shared Responsibility",
        },
        // ... more modules
    ]}
    examInfo={{
        examCode: "312-40",
        numberOfQuestions: "125",
        duration: "4 Hours",
        format: "Multiple Choice",
        passingScore: "70%",
        delivery: "EC-Council Exam Portal",
    }}
    certificationInfo={{
        validity: "3 Years",
        recognition: "Global",
        retakePolicy: "Available after 14 days",
        examVoucher: "Included in program fee",
        proctoring: "Remote or Test Center",
        continuingEducation: "Required for renewal",
    }}
/>
```

---

## Strapi Schema: CourseDetails Component

The `CourseDetails` component uses a single Strapi component with 4 repeatable sub-components (no deep nesting).

### Main Component: `global.course-details`

| Field | Type | Description |
|-------|------|-------------|
| DefaultTab | Enumeration | Default active tab: `learn`, `framework`, `outline`, `exam` |
| CourseOutlineTitle | Short text | Title for the Course Outline tab (e.g., "Cloud Security Course Outline") |
| LearnItems | Repeatable `global.learn-item` | What You'll Learn cards |
| FrameworkSteps | Repeatable `global.framework-step` | Learning Framework timeline |
| CourseModules | Repeatable `global.course-module` | Course Outline accordion items |
| ExamCode | Short text | Exam code (e.g., "312-40") |
| ExamQuestions | Short text | Number of questions (e.g., "125") |
| ExamDuration | Short text | Duration (e.g., "4 Hours") |
| ExamFormat | Short text | Format (e.g., "Multiple Choice") |
| ExamPassingScore | Short text | Passing score (e.g., "70%") |
| ExamDelivery | Short text | Delivery method (e.g., "EC-Council Exam Portal") |
| CertValidity | Short text | Validity period (e.g., "3 Years") |
| CertRecognition | Short text | Recognition scope (e.g., "Global") |
| CertRetakePolicy | Short text | Retake policy (e.g., "Available after 14 days") |
| CertExamVoucher | Short text | Voucher info (e.g., "Included in program fee") |
| CertProctoring | Short text | Proctoring options (e.g., "Remote or Test Center") |
| CertContinuingEd | Short text | Continuing ed requirement (e.g., "Required for renewal") |

---

### Sub-component: `global.learn-item`

| Field | Type | Description |
|-------|------|-------------|
| Number | Short text | Display number (e.g., "01", "02") |
| Title | Short text | Topic title |
| Description | Long text | Topic description |
| Tags | Short text | Comma-separated tags (e.g., "AWS, Azure, GCP") |
| AccentColor | Short text (optional) | Hex color for top border (e.g., "#3B82F6") |

---

### Sub-component: `global.framework-step`

| Field | Type | Description |
|-------|------|-------------|
| StepNumber | Number | Step number (1, 2, 3, 4) |
| Title | Short text | Step title (e.g., "Learn", "Practice", "Certify", "Excel") |
| Description | Long text | Step description |

---

### Sub-component: `global.course-module`

| Field | Type | Description |
|-------|------|-------------|
| ModuleNumber | Short text | Module identifier (e.g., "Module 01") |
| ModuleName | Short text | Module title |
| Description | Long text | Module description |
| KeyTopics | Long text (optional) | Comma-separated key topics |

---

### Data Transformation (API to Props)

```typescript
// Transform Strapi response to CourseDetails props
function transformCourseDetails(data: any): CourseDetailsProps {
    return {
        defaultTab: data.DefaultTab || "outline",
        courseTitle: data.CourseOutlineTitle,
        
        // Transform Learn Items
        learnItems: data.LearnItems?.map((item: any, index: number) => ({
            id: item.id || index + 1,
            number: item.Number,
            title: item.Title,
            description: item.Description,
            tags: item.Tags?.split(",").map((t: string) => t.trim()) || [],
            accentColor: item.AccentColor,
        })) || [],
        
        // Transform Framework Steps
        frameworkSteps: data.FrameworkSteps?.map((step: any) => ({
            id: step.id || step.StepNumber,
            number: step.StepNumber,
            title: step.Title,
            description: step.Description,
        })) || [],
        
        // Transform Course Modules
        courseModules: data.CourseModules?.map((mod: any, index: number) => ({
            id: mod.id || index + 1,
            moduleNumber: mod.ModuleNumber,
            moduleName: mod.ModuleName,
            description: mod.Description,
            keyTopics: mod.KeyTopics || "",
        })) || [],
        
        // Exam Info
        examInfo: data.ExamCode ? {
            examCode: data.ExamCode,
            numberOfQuestions: data.ExamQuestions,
            duration: data.ExamDuration,
            format: data.ExamFormat,
            passingScore: data.ExamPassingScore,
            delivery: data.ExamDelivery,
        } : undefined,
        
        // Certification Info
        certificationInfo: data.CertValidity ? {
            validity: data.CertValidity,
            recognition: data.CertRecognition,
            retakePolicy: data.CertRetakePolicy,
            examVoucher: data.CertExamVoucher,
            proctoring: data.CertProctoring,
            continuingEducation: data.CertContinuingEd,
        } : undefined,
    };
}
```

---

### Strapi Admin UI Structure

```
📦 course-details (Component)
├── 📝 DefaultTab (Enumeration: learn, framework, outline, exam)
├── 📝 CourseOutlineTitle (Text)
│
├── 🔁 LearnItems (Repeatable)
│   ├── Number, Title, Description, Tags, AccentColor
│
├── 🔁 FrameworkSteps (Repeatable)
│   ├── StepNumber, Title, Description
│
├── 🔁 CourseModules (Repeatable)
│   ├── ModuleNumber, ModuleName, Description, KeyTopics
│
├── 📋 Exam Information (Collapsible Group)
│   ├── ExamCode, ExamQuestions, ExamDuration
│   ├── ExamFormat, ExamPassingScore, ExamDelivery
│
└── 📋 Certification Details (Collapsible Group)
    ├── CertValidity, CertRecognition, CertRetakePolicy
    ├── CertExamVoucher, CertProctoring, CertContinuingEd
```

---

## 1. Learning Framework Section
**Component:** `global.learning-framework`

| Field | Type | Description |
|-------|------|-------------|
| Title | Short text | Section title |
| Steps | Repeatable `global.framework-step` | Steps list |

**Sub-component:** `global.framework-step`
| Field | Type | Description |
|-------|------|-------------|
| StepNumber | Number | 1, 2, 3, 4 |
| StepTitle | Short text | "Learn", "Practice", "Certify", "Excel" |
| Description | Long text | Step description |
| LinkText | Short text (optional) | "Learn more" |
| LinkUrl | Short text (optional) | "#modules" |

---

## 2. Course Outline Section
**Component:** `global.course-outline`

| Field | Type | Description |
|-------|------|-------------|
| Title | Short text | "Cloud Security Course Outline" |
| Modules | Repeatable `global.course-module` | Modules list |

**Sub-component:** `global.course-module`
| Field | Type | Description |
|-------|------|-------------|
| ModuleNumber | Short text | "Module 01" |
| ModuleTitle | Short text | "Introduction to Cloud Security" |
| Description | Long text | Module description |
| KeyTopics | Long text (optional) | Comma-separated topics |

---

## 3. Exam Details Section
**Component:** `global.exam-details`

| Field | Type | Description |
|-------|------|-------------|
| Title | Short text | "Exam Details" |
| Subtitle | Long text (optional) | Section description |
| ExamCards | Repeatable `global.exam-card` | Cards list |

**Sub-component:** `global.exam-card`
| Field | Type | Description |
|-------|------|-------------|
| BadgeText | Short text | "C|CSE Certification" |
| CardTitle | Short text | "Knowledge Exam" |
| Description | Long text | Card description |
| Stats | Repeatable `global.exam-stat` | Stats list |

**Sub-component:** `global.exam-stat`
| Field | Type | Description |
|-------|------|-------------|
| Value | Short text | "125", "4 hrs", "MCQ" |
| Label | Short text | "Questions", "Duration", "Format" |

---

## 4. Statistics Section
**Component:** `global.statistics-section`

| Field | Type | Description |
|-------|------|-------------|
| Title | Short text | "Why Choose C|CSE" |
| Stats | Repeatable `global.stat-item` | Stats list |

**Sub-component:** `global.stat-item`
| Field | Type | Description |
|-------|------|-------------|
| Value | Short text | "92%", "77K+", "$128K" |
| Description | Long text | Stat description |

---

## 5. Target Audience (Who Is For)
**Component:** `global.target-audience`

| Field | Type | Description |
|-------|------|-------------|
| Title | Short text | "Who is C|CSE for?" |
| Audiences | Repeatable `global.audience-card` | Cards list |

**Sub-component:** `global.audience-card`
| Field | Type | Description |
|-------|------|-------------|
| Title | Short text | "Cloud Administrators" |
| Description | Long text | Description |
| IconSvg | Long text (optional) | SVG code for icon |

---

## 6. Testimonials Section
**Component:** `global.testimonials-section`

| Field | Type | Description |
|-------|------|-------------|
| Title | Short text | "Success Stories" |
| Testimonials | Repeatable `global.testimonial` | Testimonials list |

**Sub-component:** `global.testimonial`
| Field | Type | Description |
|-------|------|-------------|
| Quote | Long text | Testimonial quote |
| AuthorName | Short text | "Rajesh Kumar" |
| AuthorDesignation | Short text | "Cloud Security Engineer, Deloitte" |
| AuthorAvatar | Short text (optional) | Emoji or image URL |

---

## 7. Placement Partners Section
**Component:** `global.placement-partners`

| Field | Type | Description |
|-------|------|-------------|
| Title | Short text | "Our Graduates Work At" |
| Partners | Repeatable `global.partner` | Partners list |

**Sub-component:** `global.partner`
| Field | Type | Description |
|-------|------|-------------|
| Name | Short text | "Google", "Microsoft" |
| LogoUrl | Short text (optional) | URL to logo image |

---

## 8. FAQ Section
**Component:** `global.faq-section`

| Field | Type | Description |
|-------|------|-------------|
| Title | Short text | "Frequently Asked Questions" |
| FAQs | Repeatable `global.faq-item` | FAQs list |

**Sub-component:** `global.faq-item`
| Field | Type | Description |
|-------|------|-------------|
| Question | Short text | "What is C|CSE?" |
| Answer | Long text | Answer text |
| Category | Short text (optional) | "Program", "Certification" |

---

## 9. Accreditations Section
**Component:** `global.accreditations-section`

| Field | Type | Description |
|-------|------|-------------|
| Title | Short text | "Accreditations & Recognitions" |
| Accreditations | Repeatable `global.accreditation` | List |

**Sub-component:** `global.accreditation`
| Field | Type | Description |
|-------|------|-------------|
| Name | Short text | "EC-Council Authorized" |
| BadgeText | Short text | "EC-Council", "ANSI" |
| LogoUrl | Short text (optional) | URL to logo |

---

## Adding to Certificate Dynamic Zone

Add these components to your Certificate content type's `pageContent` dynamic zone:
1. `global.learning-framework`
2. `global.course-outline`
3. `global.exam-details`
4. `global.statistics-section`
5. `global.target-audience`
6. `global.testimonials-section`
7. `global.placement-partners`
8. `global.faq-section`
9. `global.accreditations-section`

---

## API Usage

All components use `populate[pageContent][populate]=*` which will populate one level deep.
No deep nesting is used, so all data will be fetched in a single API call.
