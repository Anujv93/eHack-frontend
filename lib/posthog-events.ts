import posthog from 'posthog-js'

// ========================================
// eHack Academy – PostHog Landing Page Events
// ========================================
// All event names use snake_case for PostHog consistency.
// Properties use snake_case keys.
//
// FUNNEL:  landing_page_view → cta_clicked → form_started → form_submitted
// ENGAGEMENT: section_viewed, video_played, whatsapp_clicked, phone_clicked, course_clicked
// ========================================

// --- Page-Level Events ---

/** Fired when the landing page loads (call once in layout/page) */
export function trackLandingPageView(utmParams?: Record<string, string>) {
    posthog.capture('landing_page_view', {
        referrer: typeof document !== 'undefined' ? document.referrer : '',
        url: typeof window !== 'undefined' ? window.location.href : '',
        ...utmParams,
    })
}

// --- Section Scroll Tracking ---

/** Fired when a user scrolls a section into view */
export function trackSectionViewed(sectionId: string) {
    posthog.capture('section_viewed', {
        section: sectionId,
    })
}

// --- CTA / Button Click Events ---

/** Fired when the hero CTA button is clicked */
export function trackHeroCTAClicked() {
    posthog.capture('cta_clicked', {
        location: 'hero',
        button_text: 'YES! I WANT TO START MY CAREER',
    })
}

/** Fired when the bottom blueprint CTA form submit is clicked */
export function trackBlueprintCTAClicked() {
    posthog.capture('cta_clicked', {
        location: 'blueprint_section',
        button_text: 'SUBMIT REQUEST',
    })
}

/** Fired when "ENQUIRE NOW" is clicked in the Programs section */
export function trackProgramEnquireCTAClicked() {
    posthog.capture('cta_clicked', {
        location: 'program_comparison',
        button_text: 'ENQUIRE NOW',
    })
}

// --- Form Events ---

/** Fired when a user starts filling out a form (first field focus) */
export function trackFormStarted(formLocation: string) {
    posthog.capture('form_started', {
        form_location: formLocation,
    })
}

/** Fired on successful form submission */
export function trackFormSubmitted(formLocation: string, program?: string) {
    posthog.capture('form_submitted', {
        form_location: formLocation,
        selected_program: program || 'not_specified',
    })
}

/** Fired on form submission failure */
export function trackFormError(formLocation: string, errorMessage: string) {
    posthog.capture('form_error', {
        form_location: formLocation,
        error_message: errorMessage,
    })
}

// --- Engagement Events ---

/** Fired when WhatsApp button is clicked */
export function trackWhatsAppClicked() {
    posthog.capture('whatsapp_clicked', {
        location: 'floating_button',
    })
}

/** Fired when phone/call button is clicked */
export function trackPhoneClicked(location: string) {
    posthog.capture('phone_clicked', {
        location,
    })
}

/** Fired when a course card "View Details" link is clicked */
export function trackCourseClicked(courseName: string, organization: string) {
    posthog.capture('course_clicked', {
        course_name: courseName,
        organization,
    })
}

/** Fired when the navbar section link is clicked */
export function trackNavClicked(sectionId: string, sectionLabel: string) {
    posthog.capture('nav_clicked', {
        section_id: sectionId,
        section_label: sectionLabel,
    })
}
