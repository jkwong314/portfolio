#!/usr/bin/env python3
"""Generate Jamie Kwong's resume — one page, maximally spaced."""

from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable, KeepTogether
)
from reportlab.lib.styles import ParagraphStyle
import re, sys

OUTPUT = "/Users/jkwong/Desktop/Jamie_Kwong_Resume.pdf"

BLACK = HexColor("#18181B")
GRAY = HexColor("#52525B")
MUTED = HexColor("#71717A")
ACCENT = HexColor("#6D28D9")
RULE = HexColor("#E4E4E7")


def make_styles(mult):
    return {
        "name": ParagraphStyle("name", fontSize=19, fontName="Helvetica-Bold",
                               textColor=BLACK, leading=23, spaceAfter=1),
        "subtitle": ParagraphStyle("subtitle", fontSize=10, fontName="Helvetica",
                                   textColor=GRAY, leading=13, spaceAfter=1),
        "contact": ParagraphStyle("contact", fontSize=8, fontName="Helvetica",
                                  textColor=MUTED, leading=11, spaceAfter=0),
        "section": ParagraphStyle("section", fontSize=8, fontName="Helvetica-Bold",
                                  textColor=ACCENT, leading=11, spaceBefore=int(10*mult),
                                  spaceAfter=int(5*mult)),
        "body": ParagraphStyle("body", fontSize=9, textColor=BLACK, leading=12.5,
                               fontName="Helvetica"),
        "role_title": ParagraphStyle("role_title", fontSize=9.5, fontName="Helvetica-Bold",
                                     textColor=BLACK, leading=12.5, spaceAfter=0),
        "role_meta": ParagraphStyle("role_meta", fontSize=8, fontName="Helvetica",
                                    textColor=GRAY, leading=11, spaceAfter=int(3*mult)),
        "bullet": ParagraphStyle("bullet", fontSize=8.5, textColor=BLACK,
                                 leading=11.5, fontName="Helvetica",
                                 leftIndent=10, bulletIndent=0,
                                 spaceBefore=0.5, spaceAfter=0.5),
        "skill_cat": ParagraphStyle("skill_cat", fontSize=8.5, textColor=BLACK,
                                    leading=12, fontName="Helvetica",
                                    spaceBefore=int(2*mult), spaceAfter=int(2*mult)),
        "subrole": ParagraphStyle("subrole", fontSize=8.5, fontName="Helvetica-Bold",
                                  textColor=GRAY, leading=11.5, spaceAfter=1),
    }


def build(mult=1.0):
    styles = make_styles(mult)
    S = lambda key: styles[key]

    SP_HEADER   = int(10 * mult)
    SP_ROLE     = int(10 * mult)
    SP_SUBROLE  = int(4 * mult)
    SP_DIVIDER  = int(8 * mult)

    doc = SimpleDocTemplate(
        OUTPUT,
        pagesize=letter,
        leftMargin=0.7 * inch,
        rightMargin=0.7 * inch,
        topMargin=0.55 * inch,
        bottomMargin=0.5 * inch,
    )

    story = []

    # ── Header ──
    story.append(Paragraph("Jamie Kwong", S("name")))
    story.append(Paragraph("Product Designer", S("subtitle")))
    story.append(Paragraph(
        'jamiekwongkc@gmail.com&nbsp;&nbsp;\u00b7&nbsp;&nbsp;jamiekwong.com&nbsp;&nbsp;\u00b7&nbsp;&nbsp;'
        'linkedin.com/in/jamie-k-bba059178',
        S("contact")
    ))
    story.append(Spacer(1, SP_HEADER))
    story.append(HRFlowable(width="100%", thickness=0.5, color=RULE))

    # ── Profile ──
    story.append(Paragraph("PROFILE", S("section")))
    story.append(Paragraph(
        "Product designer who bridges design and engineering to ship polished, "
        "accessible digital experiences at scale. 5 years designing across B2C "
        "e-commerce and B2B platforms\u200a\u2014\u200afrom building headless design systems to "
        "prototyping with AI. Strongest in interaction design, design systems, "
        "and taking ideas from 0\u21921.",
        S("body")
    ))
    story.append(Spacer(1, SP_DIVIDER))
    story.append(HRFlowable(width="100%", thickness=0.5, color=RULE))

    # ── Experience ──
    story.append(Paragraph("EXPERIENCE", S("section")))

    # ALDO
    aldo = []
    aldo.append(Paragraph("ALDO Group", S("role_title")))
    aldo.append(Paragraph(
        "Montreal, QC&nbsp;&nbsp;\u00b7&nbsp;&nbsp;Jul 2021 \u2013 Present&nbsp;&nbsp;\u00b7&nbsp;&nbsp;4 yrs 10 mos",
        S("role_meta")
    ))

    aldo.append(Paragraph("UX/UI Designer&nbsp;&nbsp;<font color='#71717A'>\u00b7 Sep 2024 \u2013 Present</font>", S("subrole")))
    for b in [
        "Lead UX/UI across 4 brands (Aldo, Call It Spring, Globo, Sperry), designing e-commerce flows serving millions of users globally",
        "Led the design of a B2B expense management platform that streamlined bulk purchasing, approval workflows, and expense tracking across internal teams",
        "Increased design team efficiency by 300% by migrating Sketch \u2192 Figma and building a headless, multi-brand design system",
        "Streamlined design production by integrating AI tools into daily workflows, reducing asset creation and prototyping turnaround time",
        "Produced motion design and micro-interactions for product launches, improving engagement across key conversion flows",
        "Collaborated with project stakeholders and development teams to deliver final design implementations on schedule",
    ]:
        aldo.append(Paragraph(f"\u2022&nbsp;&nbsp;{b}", S("bullet")))

    aldo.append(Spacer(1, SP_SUBROLE))
    aldo.append(Paragraph("Associate UX/UI Designer&nbsp;&nbsp;<font color='#71717A'>\u00b7 Jun 2022 \u2013 Sep 2024</font>", S("subrole")))
    for b in [
        "Shipped user-tested prototypes and interaction specs with PMs and engineers, reducing design-to-dev handoff friction",
        "Authored a UX Playbook reference document adopted across all design teams to standardize research and design processes",
        "Built and maintained component libraries and design token systems in Figma, ensuring cross-brand consistency",
    ]:
        aldo.append(Paragraph(f"\u2022&nbsp;&nbsp;{b}", S("bullet")))

    aldo.append(Spacer(1, SP_SUBROLE))
    aldo.append(Paragraph("UX/UI Design Intern&nbsp;&nbsp;<font color='#71717A'>\u00b7 Jul 2021 \u2013 Jun 2022</font>", S("subrole")))
    for b in [
        "Conducted and analyzed user testing sessions for newly designed site experiences across all brand properties",
        "Organized and refined sitemap flows to optimize site usability",
    ]:
        aldo.append(Paragraph(f"\u2022&nbsp;&nbsp;{b}", S("bullet")))

    story.append(KeepTogether(aldo))
    story.append(Spacer(1, SP_ROLE))

    # Rally Cry
    rc = [
        Paragraph("Design Consultant", S("role_title")),
        Paragraph("Rally Cry&nbsp;&nbsp;\u00b7&nbsp;&nbsp;Jul 2022 \u2013 Oct 2022&nbsp;&nbsp;\u00b7&nbsp;&nbsp;4 mos", S("role_meta")),
    ]
    for b in [
        "Redesigned core platform flows with a focus on WCAG accessibility, improving usability for 15K+ eSports community members",
        "Developed brand identity system and promotional assets that strengthened community engagement",
    ]:
        rc.append(Paragraph(f"\u2022&nbsp;&nbsp;{b}", S("bullet")))
    story.append(KeepTogether(rc))
    story.append(Spacer(1, SP_ROLE))

    # YES Cafe
    yc = [
        Paragraph("Creative & Website Designer", S("role_title")),
        Paragraph("YES Cafe&nbsp;&nbsp;\u00b7&nbsp;&nbsp;Jan 2021 \u2013 Aug 2021&nbsp;&nbsp;\u00b7&nbsp;&nbsp;8 mos", S("role_meta")),
    ]
    for b in [
        "Designed end-to-end UI/UX for online ordering and event booking on Square CMS, streamlining checkout to 3 steps",
    ]:
        yc.append(Paragraph(f"\u2022&nbsp;&nbsp;{b}", S("bullet")))
    story.append(KeepTogether(yc))

    story.append(Spacer(1, SP_DIVIDER))
    story.append(HRFlowable(width="100%", thickness=0.5, color=RULE))

    # ── Education ──
    story.append(Paragraph("EDUCATION", S("section")))
    story.append(Paragraph("Bachelor of Design (Honours)", S("role_title")))
    story.append(Paragraph(
        "York/Sheridan Program in Design&nbsp;&nbsp;\u00b7&nbsp;&nbsp;"
        "York University & Sheridan College",
        S("role_meta")
    ))

    story.append(Spacer(1, SP_DIVIDER))
    story.append(HRFlowable(width="100%", thickness=0.5, color=RULE))

    # ── Skills ──
    story.append(Paragraph("SKILLS", S("section")))
    for s_text in [
        ("<b>Design</b>&nbsp;&nbsp;\u2014&nbsp;&nbsp;Product Design, UX/UI, Interaction Design, "
         "Design Systems, User Research & Testing, Prototyping, Motion Design, Accessibility (WCAG)"),
        ("<b>Tools</b>&nbsp;&nbsp;\u2014&nbsp;&nbsp;Figma, Framer, UXPin, Principle, "
         "Adobe CC (Photoshop, Illustrator, After Effects, Premiere Pro)"),
        ("<b>Technology</b>&nbsp;&nbsp;\u2014&nbsp;&nbsp;HTML/CSS fundamentals, "
         "AI-assisted prototyping & development (Claude, ChatGPT, Gemini), Cursor, Vercel"),
    ]:
        story.append(Paragraph(s_text, S("skill_cat")))

    doc.build(story)
    return OUTPUT


def count_pages(path):
    with open(path, 'rb') as f:
        data = f.read()
    return len(re.findall(rb'/Type\s*/Page[^s]', data))


if __name__ == "__main__":
    # Binary search for max multiplier that fits 1 page
    lo, hi = 1.0, 2.5
    for _ in range(20):
        mid = (lo + hi) / 2
        build(mid)
        if count_pages(OUTPUT) == 1:
            lo = mid
        else:
            hi = mid
    # Final build at best value
    build(lo)
    print(f"Done — mult={lo:.3f}, pages={count_pages(OUTPUT)}")
