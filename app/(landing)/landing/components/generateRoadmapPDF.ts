import { jsPDF } from 'jspdf';

// Helper to convert image URL to base64
const getBase64ImageFromUrl = async (imageUrl: string): Promise<string> => {
    try {
        const res = await fetch(imageUrl);
        const blob = await res.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                resolve(reader.result as string);
            }, false);
            reader.addEventListener("error", (err) => reject(err));
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error(`Failed to load image from ${imageUrl}`, error);
        return '';
    }
};

export const generateRoadmapPDF = async (userName: string, currentStatus: string) => {
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const primaryColor = '#ff6b00';
    const darkColor = '#111827';
    const textDark = '#1f2937';
    const textGray = '#4b5563';

    // Helper to draw background pattern (Grid)
    const drawBackgroundPattern = () => {
        doc.setDrawColor(240, 240, 240);
        doc.setLineWidth(0.2);
        for (let i = 0; i < pageWidth; i += 10) {
            doc.line(i, 0, i, pageHeight);
        }
        for (let j = 0; j < pageHeight; j += 10) {
            doc.line(0, j, pageWidth, j);
        }
    };

    const drawHeaderGrid = () => {
        // Subtle dark grid for the header
        doc.setDrawColor(31, 41, 55); // slightly lighter than #111827
        doc.setLineWidth(0.2);
        for (let i = 0; i < pageWidth; i += 8) {
            doc.line(i, 0, i, 55);
        }
        for (let j = 0; j < 55; j += 8) {
            doc.line(0, j, pageWidth, j);
        }
    };

    // --- PAGE 1: OVERVIEW & OUTCOMES ---
    drawBackgroundPattern();

    // 1. Header Area (Dark)
    doc.setFillColor(17, 24, 39); // #111827
    doc.rect(0, 0, pageWidth, 55, 'F');
    drawHeaderGrid(); // Draw grid over the dark header
    
    // Header Geometric Accent
    doc.setFillColor(255, 107, 0); // #ff6b00
    doc.rect(0, 53, pageWidth, 2, 'F');
    doc.triangle(pageWidth - 30, 0, pageWidth, 0, pageWidth, 30, 'F');

    // Load Logo (Made Even Bigger)
    const logoBase64 = await getBase64ImageFromUrl('/images/white-academy.png');
    if (logoBase64) {
        try {
            // Increased width to 80, height to 25
            doc.addImage(logoBase64, 'PNG', 15, 15, 80, 25);
        } catch (e) {
            console.error("Failed to add logo", e);
            doc.setTextColor(255, 255, 255);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(26);
            doc.text("eHack Academy", 15, 30);
        }
    }

    // Align right side text vertically with the larger logo
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("ACTION ROADMAP", pageWidth - 15, 26, { align: 'right' });
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(200, 200, 200);
    doc.text("CONFIDENTIAL & PERSONALIZED", pageWidth - 15, 32, { align: 'right' });

    // 2. Personalized Intro
    doc.setTextColor(primaryColor);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(`PREPARED EXCLUSIVELY FOR:`, 15, 75);
    
    doc.setTextColor(textDark);
    doc.setFontSize(26);
    doc.setFont("helvetica", "bold");
    doc.text(userName.toUpperCase(), 15, 85);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(textGray);
    doc.text(`Current Status: ${currentStatus}`, 15, 92);
    
    // Dynamic text based on status
    let introText = "Based on your profile, we have crafted a tailored 7-9 month blueprint to transition you into a high-paying cybersecurity role.";
    if (currentStatus === '12th Pass') introText = "Start your career early! This blueprint will take you from zero to job-ready with 2 global certifications.";
    if (currentStatus === 'Graduate') introText = "Turn your degree into a career. This blueprint bridges the gap between college and the high-paying cybersecurity industry.";
    
    const splitIntro = doc.splitTextToSize(introText, pageWidth - 30);
    doc.text(splitIntro, 15, 102);

    // 3. Recommended Program Card
    doc.setFillColor(255, 255, 255); 
    doc.setDrawColor(229, 231, 235);
    doc.setLineWidth(0.5);
    doc.roundedRect(15, 115, pageWidth - 30, 70, 4, 4, 'FD');

    // Make the orange top border slightly taller to fit two lines
    doc.setFillColor(primaryColor);
    doc.roundedRect(15, 115, pageWidth - 30, 25, 4, 4, 'F');
    // Square off the bottom corners of the header
    doc.rect(15, 135, pageWidth - 30, 5, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("RECOMMENDED PATH: JOB-READY PROGRAM", 20, 123);
    
    // Copywriting subtitle
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(255, 235, 200); // Light orange/yellow text
    const subtitleText = "(A 2-Certification bundle perfectly matched to your budget & status, designed to accelerate your expertise & secure a high-paying job.)";
    const splitSubtitle = doc.splitTextToSize(subtitleText, pageWidth - 40);
    doc.text(splitSubtitle, 20, 130);

    // Program Details
    doc.setTextColor(textDark);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Ethical Hacking & Cybersecurity", 20, 151);

    // Stats Grid
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Duration:", 20, 164);
    doc.setFont("helvetica", "normal");
    doc.text("7-9 Months", 45, 164);

    doc.setFont("helvetica", "bold");
    doc.text("Training:", 20, 174);
    doc.setFont("helvetica", "normal");
    doc.text("200+ Hours (Live + Labs)", 45, 174);

    doc.setFont("helvetica", "bold");
    doc.text("Global Certs:", 105, 164);
    doc.setFont("helvetica", "normal");
    doc.text("CSCU & CND (EC-Council)", 135, 164);

    doc.setFont("helvetica", "bold");
    doc.text("Format:", 105, 174);
    doc.setFont("helvetica", "normal");
    doc.text("Classroom + Live Online", 135, 174);

    // 4. Job Roles & Salary Potential
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    
    // Properly spaced dynamic text width
    const titlePart1 = "Target Job Roles ";
    const textWidth = doc.getTextWidth(titlePart1);
    doc.setTextColor(textDark);
    doc.text(titlePart1, 15, 200);
    
    // Orange part of the title
    doc.setTextColor(primaryColor);
    doc.text("& Salary Potential", 15 + textWidth, 200);

    // Tabular Format for Jobs and Salary
    doc.setFillColor(243, 244, 246); // Header background
    doc.rect(15, 210, pageWidth - 30, 10, 'F');
    
    doc.setTextColor(textDark);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("Job Role", 20, 217);
    doc.text("Average Annual Salary", 130, 217);

    // Replaced ₹ with Rs. because standard jsPDF helvetica font doesn't support the Indian Rupee symbol
    const roles = [
        { name: "Ethical Hacker", salary: "Rs. 6L - Rs. 12L" },
        { name: "Security Analyst", salary: "Rs. 7L - Rs. 15L" },
        { name: "Penetration Tester", salary: "Rs. 8L - Rs. 18L" },
        { name: "SOC Analyst", salary: "Rs. 6L - Rs. 14L" },
        { name: "Network Defender", salary: "Rs. 7L - Rs. 16L" },
        { name: "Forensic Investigator", salary: "Rs. 8L - Rs. 20L" }
    ];

    let ty = 227;
    roles.forEach(r => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(textDark);
        doc.text(r.name, 20, ty);
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(textGray);
        doc.text(r.salary, 130, ty);
        
        // Horizontal divider
        doc.setDrawColor(229, 231, 235);
        doc.setLineWidth(0.3);
        doc.line(15, ty + 3, pageWidth - 15, ty + 3);
        ty += 9;
    });

    // Footer Page 1
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(8);
    doc.text("Page 1 | eHack Academy Career Blueprint", pageWidth / 2, 285, { align: 'center' });


    // --- PAGE 2: CURRICULUM & TOOLS ---
    doc.addPage();
    drawBackgroundPattern();

    // Small Header (No Logo, Centered Text)
    doc.setFillColor(17, 24, 39);
    doc.rect(0, 0, pageWidth, 25, 'F');
    
    // Draw subtle grid over header
    doc.setDrawColor(31, 41, 55); 
    doc.setLineWidth(0.2);
    for (let i = 0; i < pageWidth; i += 8) doc.line(i, 0, i, 25);
    for (let j = 0; j < 25; j += 8) doc.line(0, j, pageWidth, j);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("YOUR STEP-BY-STEP CURRICULUM", pageWidth / 2, 16, { align: 'center' });

    // Curriculum Timeline - Beautiful Centered Vertical Layout
    let curY = 45;
    const centerX = pageWidth / 2;
    
    const curriculum = [
        { title: "IT & Cyber Fundamentals", desc: "Hardware, OS, Networking, Servers & Cloud", bg: [239, 246, 255], border: [191, 219, 254] }, // Blue
        { title: "Secure Computer Systems", desc: "EC-Council CSCU Curriculum & Cert Prep", bg: [240, 253, 244], border: [187, 247, 208] }, // Green
        { title: "Network Defense", desc: "EC-Council CND Curriculum - Protect, Detect", bg: [250, 245, 255], border: [233, 213, 255] }, // Purple
        { title: "Ethical Hacking & OWASP", desc: "Reconnaissance, Exploitation & Web Security", bg: [255, 247, 237], border: [254, 215, 170] }, // Orange
        { title: "Pen Testing / Forensics", desc: "Vulnerability Assessment & Evidence Analysis", bg: [253, 242, 248], border: [251, 207, 232] }, // Pink
        { title: "3-Month Internship", desc: "Real-time industry projects & SOC Operations", bg: [248, 250, 252], border: [203, 213, 225] } // Slate
    ];

    // Draw the main vertical trunk line
    doc.setDrawColor(255, 107, 0); // Orange trunk
    doc.setLineWidth(1.5);
    doc.line(centerX, 45, centerX, 45 + (curriculum.length - 1) * 32);

    let isLeft = true;
    for (let i = 0; i < curriculum.length; i++) {
        // Draw "Stage Achievement" Node exactly in the center
        doc.setFillColor(255, 255, 255); // White border
        doc.circle(centerX, curY, 6, 'F');
        doc.setFillColor(255, 107, 0); // Orange inner
        doc.circle(centerX, curY, 4.5, 'F');

        // Determine Card Position
        const cardWidth = 85; // Increased box size
        const cardHeight = 26; // Increased box size
        const cardX = isLeft ? centerX - cardWidth - 10 : centerX + 10;
        const cardY = curY - (cardHeight / 2);

        // Draw horizontal connector line
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.5);
        if (isLeft) {
            doc.line(centerX - 6, curY, centerX - 10, curY);
        } else {
            doc.line(centerX + 6, curY, centerX + 10, curY);
        }

        const stage = curriculum[i];

        // Draw Stage Info Card with beautiful pastel colors
        doc.setFillColor(stage.bg[0], stage.bg[1], stage.bg[2]);
        doc.setDrawColor(stage.border[0], stage.border[1], stage.border[2]);
        doc.setLineWidth(0.6); // Thicker border
        doc.roundedRect(cardX, cardY, cardWidth, cardHeight, 3, 3, 'FD');
        
        // Beautiful large phase number on the right side
        doc.setTextColor(stage.border[0], stage.border[1], stage.border[2]); // match border color
        doc.setFontSize(28);
        doc.setFont("helvetica", "bold");
        doc.text(`0${i+1}`, cardX + cardWidth - 4, cardY + 19, { align: "right" });
        
        // Stage Title
        doc.setTextColor(textDark);
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.text(stage.title, cardX + 5, cardY + 9.5);
        
        // Stage Desc
        doc.setTextColor(textGray);
        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        let splitDesc = doc.splitTextToSize(stage.desc, cardWidth - 10);
        doc.text(splitDesc, cardX + 5, cardY + 16.5);

        curY += 32;
        isLeft = !isLeft;
    }

    // Tools You'll Master
    doc.setTextColor(textDark);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("TOOLS YOU WILL MASTER", 15, 225);
    
    doc.setDrawColor(primaryColor);
    doc.setLineWidth(1);
    doc.line(15, 230, 80, 230);

    // Load Tool Logos
    const tools = [
        { name: 'Python', url: '/images/tools/python.png' },
        { name: 'Burp Suite', url: '/images/tools/burpsuite.png' },
        { name: 'Wireshark', url: '/images/tools/wireshark.png' },
        { name: 'Nmap', url: '/images/tools/nmap.png' },
        { name: 'Kali Linux', url: '/images/tools/kali.png' },
        { name: 'Metasploit', url: '/images/tools/metasploit.png' }
    ];

    let tX = 15;
    let tY = 240;
    
    for (let i = 0; i < tools.length; i++) {
        const tool = tools[i];
        
        // Draw card for tool
        doc.setFillColor(255, 255, 255);
        doc.setDrawColor(229, 231, 235);
        doc.setLineWidth(0.5);
        doc.roundedRect(tX, tY, 25, 25, 3, 3, 'FD');
        
        const base64 = await getBase64ImageFromUrl(tool.url);
        if (base64) {
            try {
                // Center image in the 25x25 box
                doc.addImage(base64, 'PNG', tX + 5, tY + 4, 15, 15);
            } catch (e) {
                console.error("Failed to add image", tool.name, e);
            }
        }
        
        doc.setFontSize(7);
        doc.setTextColor(textGray);
        doc.setFont("helvetica", "bold");
        doc.text(tool.name, tX + 12.5, tY + 29, { align: 'center' });

        tX += 32;
        if ((i + 1) % 6 === 0) { // 6 across
            tX = 15;
            tY += 40;
        }
    }

    // Footer CTA
    doc.setFillColor(17, 24, 39);
    doc.rect(0, 275, pageWidth, 22, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("READY TO START YOUR CAREER?", pageWidth / 2, 283, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(255, 107, 0); // highlight phone number
    doc.text("Call us at +91 9886035330 or visit www.ehackacademy.com", pageWidth / 2, 290, { align: 'center' });

    // Save PDF
    doc.save(`eHack_Career_Roadmap_${userName.replace(/\s+/g, '_')}.pdf`);
};
