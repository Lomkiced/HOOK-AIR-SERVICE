"use client";

import React, { createContext, useContext, useSyncExternalStore, useEffect, useCallback } from "react";
import type { BrandId } from "@/lib/brands";

export type Language = "en" | "th";

export interface HeroMilestone {
  index: string;
  phase: string;
  title: string;
  sub: string;
}

export interface FpovPillar {
  num: string;
  subtitle: string;
  title: string;
  body: string;
  timecode: string;
}

export interface FounderMessage {
  eyebrow: string;
  quote: string;
  author: string;
  role: string;
  signature: string;
}

export interface AboutMilestoneStat {
  value: string;
  label: string;
}

export interface ServicePillar {
  num: string;
  category: string;
  title: string;
  price: string;
  unitNote: string;
  description: string;
  specs: string[];
}

export interface BrandProfile {
  tech: string;
  method: string;
}

export interface PropertyStep {
  title: string;
  line: string;
}

export interface PropertyProfile {
  tab: string;
  line: string;
  price: string;
  duration: string;
  units: string;
  steps: PropertyStep[];
}

export interface DistrictZone {
  id: string;
  name: string;
  areas: string;
  dispatchTime: string;
  teamsActive: number;
}

export interface Translations {
  nav: {
    brandName: string;
    brandSub: string;
    home: string;
    about: string;
    services: string;
    brands: string;
    contact: string;
    bookService: string;
    staffPortal: string;
    langSwitchLabel: string;
  };
  hero: {
    eyebrow: string;
    milestones: HeroMilestone[];
    cta: string;
    secondaryCta: string;
    scrollPrompt: string;
    assemblyProgressLabel: string;
    stateExploded: string;
    stateAssembled: string;
  };
  about: {
    sectionIndex: string;
    heading: string;
    lead: string;
    videoCaption: string;
    videoSub: string;
    playFullBtn: string;
    scrubModeBtn: string;
    stageLabels: [string, string, string];
    pillars: FpovPillar[];
    founder: FounderMessage;
    milestones: AboutMilestoneStat[];
    metrics: {
      units: { value: string; label: string };
      warranty: { value: string; label: string };
      compliance: { value: string; label: string };
    };
  };
  services: {
    sectionIndex: string;
    heading: string;
    sub: string;
    bookProtocol: string;
    matrix: ServicePillar[];
  };
  brands: {
    sectionIndex: string;
    heading: string;
    sub: string;
    dockLabel: string;
    techLabel: string;
    methodLabel: string;
    pressureLabel: string;
    timeLabel: string;
    minutes: string;
    preview: string;
    profiles: Record<BrandId, BrandProfile>;
  };
  slider: {
    sectionIndex: string;
    heading: string;
    sub: string;
    instruction: string;
    ariaLabel: string;
    before: { label: string; temp: string; blockage: string; energy: string; summary: string };
    after: { label: string; temp: string; blockage: string; energy: string; summary: string };
    tempLabel: string;
    blockageLabel: string;
    energyLabel: string;
  };
  explorer: {
    heading: string;
    sub: string;
    from: string;
    perUnit: string;
    book: string;
    profiles: { condo: PropertyProfile; house: PropertyProfile };
  };
  contact: {
    sectionIndex: string;
    heading: string;
    sub: string;
    phoneTitle: string;
    phonePrimary: string;
    phoneSecondary: string;
    phoneNote: string;
    lineTitle: string;
    lineHandle: string;
    lineNote: string;
    hoursTitle: string;
    hoursValue: string;
    hoursSub: string;
    coverageTitle: string;
    coverageSub: string;
    primaryCta: string;
    lineCta: string;
  };
  serviceArea: {
    zones: DistrictZone[];
  };
  modal: {
    title: string;
    subtitle: string;
    tabInstant: string;
    tabLine: string;
    propertyTypeLabel: string;
    condoOption: string;
    houseOption: string;
    unitCountLabel: string;
    unitSuffix: string;
    zoneLabel: string;
    dateLabel: string;
    timeSlotLabel: string;
    timeSlots: string[];
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    estimatedTotal: string;
    multiUnitDiscount: string;
    includesNote: string;
    submitBookingBtn: string;
    bookingSuccessTitle: string;
    bookingSuccessDesc: string;
    bookingRefLabel: string;
    resetBtn: string;
    lineBox: {
      headline: string;
      subtext: string;
      lineIdLabel: string;
      lineIdValue: string;
      copyBtn: string;
      copiedBtn: string;
      autoMessageLabel: string;
      openLineBtn: string;
      responseGuarantee: string;
    };
  };
  footer: {
    companyDesc: string;
    hoursLabel: string;
    hoursValue: string;
    licenseText: string;
    copyright: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      brandName: "HOOK AIR SERVICE",
      brandSub: "ฮูก แอร์เซอร์วิส",
      home: "Home",
      about: "About Us",
      services: "Services",
      brands: "Brands",
      contact: "Contact Us",
      bookService: "Book Service",
      staffPortal: "Staff Portal",
      langSwitchLabel: "Switch language between English and Thai",
    },
    hero: {
      eyebrow: "HOOK AIR SERVICE — CLINICAL HVAC OVERHAUL",
      milestones: [
        {
          index: "01",
          phase: "01 / DISASSEMBLY",
          title: "Every Component. Exposed.",
          sub: "100% disassembly down to the blower wheel and evaporator coil.",
        },
        {
          index: "02",
          phase: "02 / HYDRO-SANITIZATION",
          title: "150 PSI. Zero Bacteria.",
          sub: "Clinical-grade flushing eliminates hidden mold and biofilm.",
        },
        {
          index: "03",
          phase: "03 / CALIBRATED REBUILD",
          title: "Rebuilt to Factory Spec.",
          sub: "Laser-aligned louvers, sealed drainage, zero vibration.",
        },
        {
          index: "04",
          phase: "04 / ARCTIC OUTPUT",
          title: "Pure Arctic Air.",
          sub: "Restored heat-exchange efficiency. Immediate booking available.",
        },
      ],
      cta: "Book Service",
      secondaryCta: "Explore Protocols",
      scrollPrompt: "Scroll to scrub assembly sequence",
      assemblyProgressLabel: "ASSEMBLY SEQUENCE",
      stateExploded: "00% EXPLODED CORE",
      stateAssembled: "100% FACTORY SEALED",
    },
    about: {
      sectionIndex: "01 — ABOUT HOOK AIR SERVICE",
      heading: "From Doorstep Fleet Arrival to Living-Room Precision.",
      lead:
        "Experience our first-person on-site walkthrough: walking between our signature white-and-blue three-wheeled service trucks, stepping respectfully through your glass sliding doors, and ascending the service ladder for clinical coil disassembly.",
      videoCaption: "FPOV ON-SITE WALKTHROUGH — BANGKOK DISPATCH",
      videoSub:
        "Scroll to scrub through 01 Arrival → 02 Threshold → 03 Precision Care",
      playFullBtn: "Play Full Walkthrough with 1 Click",
      scrubModeBtn: "Return to Scroll-Scrub Mode",
      stageLabels: ["01 Arrival", "02 Threshold", "03 Precision Care"],
      pillars: [
        {
          num: "01",
          subtitle: "OUR ORIGIN — WHEN HOOK AIR SERVICE STARTED",
          title:
            "Established to Elevate Thai Aircon Servicing into Disciplined Engineering.",
          body:
            "Hook Air Service was founded with a singular mission: to transform residential and condominium air-conditioning care in Thailand from informal, unpredictable handyman visits into a disciplined, engineering-grade home service—symbolized by our custom fleet of white-and-blue three-wheeled service trucks arriving directly at your doorstep.",
          timecode: "01 ARRIVAL // THREE-WHEELED FLEET",
        },
        {
          num: "02",
          subtitle: "WHAT WE DO — CLINICAL DISASSEMBLY & HOME RESPECT",
          title:
            "Cleaning, Repair, Installation & Relocation — Transparently Starting at 400 THB.",
          body:
            "We deliver comprehensive air-conditioning cleaning, repair, installation, and relocation starting at 400 THB. As captured in our walkthrough—stepping through white-framed glass sliding doors with clean-shoe/barefoot respect, laying down protective floor tarps, and ascending our matte-black ladder in uniform—we execute full front-fascia and filter disassembly and 150 PSI coil flushing across all 13 global brands.",
          timecode: "02 THRESHOLD & 03 PRECISION CARE",
        },
        {
          num: "03",
          subtitle: "FOUNDER'S MESSAGE — A PERSONAL PROMISE",
          title: "Absolute Trust Inside Your Living Space.",
          body:
            "Every technician is trained not only in inverter electronics and high-pressure hydro-sanitization, but in homeowner etiquette—leaving your floors, walls, and indoor air cleaner than when we arrived.",
          timecode: "03 EXECUTIVE STANDARD",
        },
      ],
      founder: {
        eyebrow: "03 / FOUNDER'S MESSAGE — A PERSONAL PROMISE",
        quote:
          "When we started Hook Air Service, we realized that inviting a technician into your living room requires absolute trust. We don't just clean air-conditioners—we protect the air your family breathes, respect the cleanliness of your home, and guard your privacy and comfort as if it were our own.",
        author: "Founder & Chief Service Architect",
        role: "HOOK AIR SERVICE (ฮูก แอร์เซอร์วิส) • BANGKOK",
        signature: "Hook Air Service Executive Directorate",
      },
      milestones: [
        { value: "13+", label: "Global Brands Mastered" },
        { value: "100%", label: "Deep Coil Disassembly" },
        { value: "400.-", label: "Transparent Starting Rate (THB)" },
      ],
      metrics: {
        units: { value: "13+", label: "Global Brands Mastered" },
        warranty: { value: "100%", label: "Deep Coil Disassembly" },
        compliance: { value: "400.-", label: "Transparent Starting Rate" },
      },
    },
    services: {
      sectionIndex: "02 — SERVICES & TECHNICAL PROTOCOLS",
      heading: "Four Disciplines. Zero Shortcuts.",
      sub:
        "Transparent, all-inclusive pricing engineered for high-rise condominiums and multi-unit residential homes across Greater Bangkok.",
      bookProtocol: "Select Protocol",
      matrix: [
        {
          num: "01",
          category: "CONDOMINIUM PROTOCOL",
          title: "High-Rise Zero-Splash Deep Clean",
          price: "฿550",
          unitNote: "/ unit (2+ units) • Single unit ฿650",
          description:
            "Tailored for Bangkok condominiums with narrow balconies, engineered wood flooring, and strict Juristic noise and water containment regulations.",
          specs: [
            "Juristic Office contractor registration & work permit coordination",
            "360° waterproof catchment funnel into sealed wastewater tank",
            "Balcony condenser splash shield — zero overspray to neighbors",
            "High-pressure condensate drain line flush & 30-day warranty",
          ],
        },
        {
          num: "02",
          category: "RESIDENTIAL HOUSE & VILLA",
          title: "Multi-Unit Whole-Home Overhaul",
          price: "฿500",
          unitNote: "/ unit (3+ units) • 1–2 units ฿600",
          description:
            "Executed by a two-technician crew for detached homes and townhomes facing heavy outdoor garden dust, kitchen grease film, and long PVC drain runs.",
          specs: [
            "Pre-wash capacitor, compressor amperage & ΔT thermal audit",
            "Full blower barrel removal & alkaline kitchen-grease lifting foam",
            "Outdoor garden condenser mud & leaf descaling wash",
            "15-meter main PVC drainage line hydro-jet purge",
          ],
        },
        {
          num: "03",
          category: "COMMERCIAL & LUXURY SYSTEMS",
          title: "4-Way Ceiling Cassette & Concealed Duct",
          price: "฿1,400",
          unitNote: "/ unit (18,000 – 48,000 BTU)",
          description:
            "Precision disassembly for four-way ceiling cassettes and concealed ducted systems in penthouses, villas, and executive offices.",
          specs: [
            "Centrifugal turbo fan wheel & condensate float-switch disassembly",
            "Internal condensate lift-pump reservoir sanitization",
            "Ceiling access panel & diffuser grille restoration",
            "R32 / R410A operating pressure & subcooling verification",
          ],
        },
        {
          num: "04",
          category: "CLINICAL REMEDIATION",
          title: "Biofilm Eradication & Leak Recovery",
          price: "฿850",
          unitNote: "/ unit (heavily fouled or leaking units)",
          description:
            "Intensive restoration for air conditioners suffering from chronic water overflow, black mold colonization, or severe airflow blockage.",
          specs: [
            "Dual-side evaporator core chemical-free pH-neutral foam soak",
            "Nitrogen & high-pressure drain pan algae extraction",
            "Botanical quaternary ammonium anti-microbial fogging",
            "Post-service digital anemometer velocity & temperature report",
          ],
        },
      ],
    },
    brands: {
      sectionIndex: "03 — CERTIFIED BRAND ARCHITECTURE",
      heading: "13 Global Manufacturers. One Standard.",
      sub:
        "Every air conditioner brand uses distinct coil coatings, ionizers, and louver mechanics. Select a manufacturer below to inspect our dedicated service protocol.",
      dockLabel: "SELECT MANUFACTURER TO INSPECT PROTOCOL",
      techLabel: "01 / SIGNATURE HARDWARE ARCHITECTURE",
      methodLabel: "02 / HOOK AIR SERVICE PROTOCOL",
      pressureLabel: "03 / CALIBRATED WASH PRESSURE",
      timeLabel: "04 / BENCHMARK SERVICE DURATION",
      minutes: "MIN",
      preview: "Sync Brand to Hero Rig",
      profiles: {
        daikin: {
          tech: "Coanda Airflow Louvers & Streamer Discharge Module",
          method:
            "We detach the Coanda dual-flaps and isolate the high-voltage Streamer unit before flushing the Blue-Fin evaporator at 120 PSI.",
        },
        mitsubishi: {
          tech: "Dual Barrier Coating & Easy-Clean Chassis",
          method:
            "Washed strictly with pH-neutral solutions and calibrated 90 PSI fan-jets so the factory fluorine-hydrophilic Dual Barrier Coating remains intact.",
        },
        carrier: {
          tech: "Xpower Gold Ionizer & Self-Clean Evaporator",
          method:
            "The Xpower ionizer assembly is sealed in a dry enclosure while we deep-flush the rear coil face and condensate trough that automated cycles cannot reach.",
        },
        haier: {
          tech: "Frost Self-Clean & 56°C Sterilization Matrix",
          method:
            "Thermistor probes are shielded before extracting the squirrel-cage barrel and flushing calcified biofilm from the primary drain spout.",
        },
        amena: {
          tech: "Heavy-Duty Thai Tropical Condenser & Evaporator",
          method:
            "Full 150 PSI dual-angle hydro-flushing engineered for dense Bangkok PM2.5 buildup and long condominium drainage runs.",
        },
        samsung: {
          tech: "WindFree 23,000 Micro-Hole Dispersion Fascia",
          method:
            "The perforated WindFree fascia is detached and ultrasonically cleared so all 23,000 micro-apertures breathe freely without condensation sweating.",
        },
        toshiba: {
          tech: "Magic Coil Aqua-Resin Coating & Ultra-Pure Filter",
          method:
            "Non-abrasive laminar water jets preserve the aqua-resin Magic Coil layer while the blower wheel is balanced and sanitized outside the chassis.",
        },
        tcl: {
          tech: "Titan Gold Hydrophilic Fin Array",
          method:
            "Vertical precision nozzle passes remove embedded dust cake between the Titan Gold fins without deforming thin aluminum edges.",
        },
        sharp: {
          tech: "Plasmacluster Ion Generator & Long Coanda Panel",
          method:
            "The Plasmacluster electrode cartridge is removed and dry-cleaned separately prior to full high-pressure coil and drain-tray sanitization.",
        },
        midea: {
          tech: "PrimeGuard Golden Fin & Active Clean Core",
          method:
            "Control harness and louver stepper motors are isolated before a complete evaporator, rear-duct, and blower wheel overhaul.",
        },
        fujitsu: {
          tech: "Oversized Cross-Flow Turbine & Apple-Catechin Filter",
          method:
            "The large-diameter cylindrical fan barrel is extracted for deep blade descaling while catechin and ion-deodorizing filters are refreshed.",
        },
        lg: {
          tech: "DUAL Inverter Compressor & Gold Fin™ Heat Exchanger",
          method:
            "Low-turbulence 100 PSI coil rinse protects the corrosion-resistant Gold Fin™ layer, followed by a post-wash inverter amperage verification.",
        },
        panasonic: {
          tech: "nanoe™ X Hydroxyl Radical Generator & Aerowings",
          method:
            "The nanoe™ X atomizer is hermetically masked while twin Aerowings blades, coil fins, and rear condensate channels receive a clinical flush.",
        },
      },
    },
    slider: {
      sectionIndex: "INTERNAL COIL INSPECTION",
      heading: "Six Months of Bangkok Dust. Gone in One Visit.",
      sub: "Drag the inspection divider to compare an unwashed evaporator core against our 150 PSI clinical restoration.",
      instruction: "DRAG DIVIDER LEFT OR RIGHT",
      ariaLabel: "Before and after coil cleaning comparison",
      before: {
        label: "01 / BEFORE OVERHAUL",
        temp: "19.8°C",
        blockage: "78%",
        energy: "+34%",
        summary: "Biofilm slime and PM2.5 dust block 78% of aluminum fins, causing water leaks and high electricity bills.",
      },
      after: {
        label: "02 / AFTER 150 PSI OVERHAUL",
        temp: "10.5°C",
        blockage: "0%",
        energy: "Optimal",
        summary: "Unobstructed aluminum fins, sanitized blower wheel, and purged drainage restore crisp arctic airflow.",
      },
      tempLabel: "Discharge Temp",
      blockageLabel: "Fin Blockage",
      energyLabel: "Power Draw",
    },
    explorer: {
      heading: "Architecture-Specific Execution.",
      sub: "Toggle between our High-Rise Condominium and Residential House operating procedures.",
      from: "All-Inclusive Rate From",
      perUnit: "/ unit",
      book: "Book This Protocol",
      profiles: {
        condo: {
          tab: "01 / Condominium",
          line: "Juristic permit coordination, whisper-quiet inverter pump, 100% dry floors.",
          price: "฿550",
          duration: "45–60 MIN / UNIT",
          units: "2+ UNITS BUNDLE",
          steps: [
            { title: "Sealed Containment", line: "Floor mats, PCB waterproof housing, closed wastewater recovery tank." },
            { title: "Blower Extraction", line: "Squirrel-cage fan and drain pan removed and washed outside the unit." },
            { title: "Balcony Shielding", line: "Outdoor condenser wrapped so zero dirty water splashes neighboring rooms." },
            { title: "Digital Verification", line: "Discharge temperature and amperage report delivered via LINE." },
          ],
        },
        house: {
          tab: "02 / House & Villa",
          line: "Two-technician residential crew servicing up to 8 units in a single visit.",
          price: "฿500",
          duration: "40–50 MIN / UNIT",
          units: "3+ UNITS BUNDLE",
          steps: [
            { title: "Diagnostic Audit", line: "Starting capacitor, compressor amps, and ΔT checked on every unit." },
            { title: "150 PSI Coil Flush", line: "Dual-side evaporator wash with biodegradable kitchen-grease foam." },
            { title: "Garden Condenser", line: "Outdoor unit descaled of mud and leaves; PVC drain line jetted to main trap." },
            { title: "Clinical Fogging", line: "Botanical anti-microbial misting and R32/R410A pressure verification." },
          ],
        },
      },
    },
    contact: {
      sectionIndex: "04 — CONTACT US & IMMEDIATE DISPATCH",
      heading: "Direct Dispatch Across Greater Bangkok.",
      sub:
        "Speak directly with our bilingual scheduling desk or book instantly online. Zero travel surcharge across Bangkok, Nonthaburi, Pathum Thani, and Samut Prakan.",
      phoneTitle: "01 / DIRECT TELEPHONE DISPATCH",
      phonePrimary: "092-420-0043",
      phoneSecondary: "098-364-9865",
      phoneNote: "Immediate technician scheduling & Condo Juristic paperwork coordination.",
      lineTitle: "02 / OFFICIAL LINE DISPATCH",
      lineHandle: "@airconpro.th",
      lineNote: "Send unit photos, request multi-unit quotes, or book in under 3 minutes.",
      hoursTitle: "03 / OPERATING HOURS",
      hoursValue: "08:00 – 20:00 Daily",
      hoursSub: "Monday – Sunday, including all Thai Public Holidays.",
      coverageTitle: "04 / ZERO-SURCHARGE COVERAGE ZONES",
      coverageSub: "Sukhumvit • Sathorn • Silom • Rama 9 • Ratchada • Ari • Chatuchak • Bangna • Srinakarin • Thonburi • Nonthaburi",
      primaryCta: "Open Instant Booking Estimator",
      lineCta: "Connect via LINE Official",
    },
    serviceArea: {
      zones: [
        {
          id: "sukhumvit",
          name: "Sukhumvit & Central CBD",
          areas: "Asoke, Phrom Phong, Thonglor, Ekkamai, On Nut, Nana, Ploenchit",
          dispatchTime: "45 mins",
          teamsActive: 5,
        },
        {
          id: "sathorn",
          name: "Silom, Sathorn & Riverside",
          areas: "Sathorn, Silom, Naradhiwas, Charoenkrung, Rama 3, IconSiam",
          dispatchTime: "50 mins",
          teamsActive: 4,
        },
        {
          id: "rama9",
          name: "Rama 9, Ratchada & Ladprao",
          areas: "Rama 9, Huai Khwang, Sutthisan, Lat Phrao, Ramkhamhaeng",
          dispatchTime: "45 mins",
          teamsActive: 4,
        },
        {
          id: "ari",
          name: "Ari, Phahonyothin & Vibhavadi",
          areas: "Victory Monument, Ari, Saphan Khwai, Chatuchak, Ratchayothin, Don Mueang",
          dispatchTime: "55 mins",
          teamsActive: 3,
        },
        {
          id: "bangna",
          name: "Bangna, Srinakarin & Prawet",
          areas: "Bearing, Bang Na-Trad, Mega Bangna, Srinakarin, Suvarnabhumi, Pattanakarn",
          dispatchTime: "50 mins",
          teamsActive: 4,
        },
        {
          id: "nonthaburi",
          name: "Nonthaburi, Thonburi & West BKK",
          areas: "Rattanathibet, Chaengwattana, Pinklao, Ratchaphruek, Bang Wa, Sathorn-Thonburi",
          dispatchTime: "60 mins",
          teamsActive: 3,
        },
      ],
    },
    modal: {
      title: "Quick Booking & Instant Price Estimator",
      subtitle: "Configure your cleaning session in 30 seconds or send directly to our LINE Official dispatch desk.",
      tabInstant: "Instant Web Booking",
      tabLine: "Connect via LINE Official",
      propertyTypeLabel: "1. Property Type",
      condoOption: "Condo Room (คอนโด)",
      houseOption: "House / Villa (บ้านพักอาศัย)",
      unitCountLabel: "2. Number of Aircon Units",
      unitSuffix: "Units",
      zoneLabel: "3. Service Area Zone",
      dateLabel: "Preferred Date",
      timeSlotLabel: "Preferred Arrival Window",
      timeSlots: [
        "09:00 – 11:30 (Morning Slot)",
        "13:00 – 15:30 (Afternoon Slot)",
        "16:00 – 18:30 (After-Work Condo Slot)",
      ],
      nameLabel: "Contact Name",
      namePlaceholder: "e.g., Khun Alex / Room 2408",
      phoneLabel: "Mobile / LINE Phone Number",
      phonePlaceholder: "08X-XXX-XXXX",
      estimatedTotal: "Estimated All-Inclusive Total",
      multiUnitDiscount: "Multi-Unit Bundle Applied!",
      includesNote: "Includes high-pressure coil wash, drain purge, anti-bacterial mist & 30-day warranty. Pay after inspection.",
      submitBookingBtn: "Confirm Booking Request (Pay After Service)",
      bookingSuccessTitle: "Booking Request Logged!",
      bookingSuccessDesc:
        "Our dispatch coordinator will confirm your technician team and Condo Juristic documents within 10 minutes via SMS/LINE.",
      bookingRefLabel: "Dispatch Reference Code",
      resetBtn: "Modify Booking Details",
      lineBox: {
        headline: "Prefer Booking on LINE? One Tap & Done.",
        subtext:
          "Copy your pre-configured quote summary below and message our bilingual English/Thai dispatch team on LINE Official.",
        lineIdLabel: "Official LINE ID",
        lineIdValue: "@airconpro.th",
        copyBtn: "Copy LINE ID & Quote Code",
        copiedBtn: "Copied to Clipboard!",
        autoMessageLabel: "Your Pre-Filled Booking Summary:",
        openLineBtn: "Open LINE App (@airconpro.th)",
        responseGuarantee: "Average live dispatcher reply time: under 3 minutes (08:00–21:00 daily)",
      },
    },
    footer: {
      companyDesc:
        "Thailand's high-trust residential and condominium air-conditioning hygiene specialists. Certified technicians, background-checked staff, and transparent pricing.",
      hoursLabel: "Daily Dispatch Hours",
      hoursValue: "08:00 – 20:00 (Mon – Sun, including Public Holidays)",
      licenseText: "Department of Skill Development Certified HVAC Technicians • Tax ID Verified",
      copyright: "© 2026 Hook Air Service Co., Ltd. (ฮูก แอร์เซอร์วิส). All rights reserved.",
    },
  },
  th: {
    nav: {
      brandName: "HOOK AIR SERVICE",
      brandSub: "ฮูก แอร์เซอร์วิส",
      home: "หน้าแรก",
      about: "เกี่ยวกับเรา",
      services: "บริการของเรา",
      brands: "แบรนด์ที่รองรับ",
      contact: "ติดต่อเรา",
      bookService: "จองคิวล้างแอร์",
      staffPortal: "ระบบพนักงาน",
      langSwitchLabel: "สลับภาษาระหว่างภาษาอังกฤษและภาษาไทย",
    },
    hero: {
      eyebrow: "HOOK AIR SERVICE — มาตรฐานวิศวกรรมการล้างแอร์ระดับคลินิก",
      milestones: [
        {
          index: "01",
          phase: "01 / ถอดแยกชิ้นส่วน",
          title: "ถอดล้างลึกทุกชิ้นส่วน",
          sub: "รื้อถอดโครงสร้างภายในครบทุกชิ้น จนถึงพัดลมโพรงกระรอกและแผงคอยล์เย็น",
        },
        {
          index: "02",
          phase: "02 / ฉีดล้างฆ่าเชื้อแรงดันสูง",
          title: "ฉีดล้างแรงดันสูง สะอาดไร้เชื้อโรค",
          sub: "อัดฉีดน้ำแรงดันสูง 150 PSI ขจัดคราบเมือกเหนียวและเชื้อราสะสม 99.9%",
        },
        {
          index: "03",
          phase: "03 / ประกอบกลับมาตรฐานโรงงาน",
          title: "ประกอบกลับอย่างปราณีตระดับโรงงาน",
          sub: "ตั้งศูนย์ใบพัดและบานสวิงแม่นยำ ท่อเดรนน้ำทิ้งโล่งสนิท ไร้เสียงสั่นรบกวน",
        },
        {
          index: "04",
          phase: "04 / ความเย็นบริสุทธิ์",
          title: "ความเย็นบริสุทธิ์ที่เหนือกว่า",
          sub: "คืนประสิทธิภาพการแลกเปลี่ยนความร้อนเต็มกำลัง ประหยัดค่าไฟฟ้าทันที",
        },
      ],
      cta: "จองคิวล้างแอร์",
      secondaryCta: "ดูมาตรฐานบริการ",
      scrollPrompt: "เลื่อนหน้าจอเพื่อดูขั้นตอนการถอดและประกอบชิ้นส่วน",
      assemblyProgressLabel: "ลำดับการประกอบชิ้นส่วน",
      stateExploded: "00% ถอดแยกชิ้นส่วนภายใน",
      stateAssembled: "100% ประกอบสมบูรณ์พร้อมใช้งาน",
    },
    about: {
      sectionIndex: "01 — เกี่ยวกับ ฮูก แอร์เซอร์วิส (ABOUT US)",
      heading: "จากขบวนรถบริการหน้าบ้าน สู่ความประณีตในห้องนั่งเล่นของคุณ",
      lead:
        "สัมผัสการทำงานจริงแบบ First-Person ของทีมฮูก แอร์เซอร์วิส ตั้งแต่การเดินผ่านขบวนรถสามล้อบริการสีขาว-น้ำเงินหน้าบ้าน ก้าวผ่านประตูกระจกขอบขาวด้วยความเคารพสถานที่ ไปจนถึงช่างชุดน้ำเงินบนบันไดดำที่ถอดล้างแอร์อย่างพิถีพิถัน",
      videoCaption: "บันทึกมุมมองหน้างานจริง (FPOV WALKTHROUGH) — ฮูก แอร์เซอร์วิส",
      videoSub:
        "เลื่อนสกรอลล์เพื่อรับชม 01 ขบวนรถถึงหน้าบ้าน → 02 เข้าพื้นที่ → 03 ถอดล้างลึกบนบันได",
      playFullBtn: "เล่นวิดีโอเต็มแบบต่อเนื่อง (คลิกเดียว)",
      scrubModeBtn: "กลับสู่โหมดเลื่อนตามสกรอลล์",
      stageLabels: [
        "01 ขบวนรถถึงหน้าบ้าน",
        "02 เข้าพื้นที่ด้วยความเคารพ",
        "03 ถอดล้างลึกบนบันได",
      ],
      pillars: [
        {
          num: "01",
          subtitle: "จุดเริ่มต้นของ ฮูก แอร์เซอร์วิส (OUR ORIGIN)",
          title:
            "ก่อตั้งขึ้นเพื่อยกระดับงานช่างแอร์ไทย สู่บริการมาตรฐานวิศวกรรมมืออาชีพ",
          body:
            "ฮูก แอร์เซอร์วิส เริ่มต้นขึ้นด้วยพันธกิจที่ชัดเจน คือการยกระดับงานบริการแอร์บ้านและคอนโดมิเนียมในประเทศไทย จากงานช่างทั่วไปที่ไร้มาตรฐานแน่นอน ให้กลายเป็นบริการระดับมืออาชีพที่มีระเบียบแบบแผน สัญลักษณ์สำคัญของเราคือขบวนรถสามล้อบริการสีขาว-น้ำเงินที่พร้อมเดินทางเข้าถึงหน้าบ้านคุณอย่างตรงเวลา พร้อมอุปกรณ์มาตรฐานครบมือ",
          timecode: "01 ARRIVAL // ขบวนรถสามล้อบริการ",
        },
        {
          num: "02",
          subtitle: "มาตรฐานและสิ่งที่เราทำ (WHAT WE DO)",
          title:
            "บริการล้าง ซ่อม ติดตั้ง และย้ายแอร์ครบวงจร — เริ่มต้นเพียง 400 บาท",
          body:
            "เราเชี่ยวชาญด้านการล้างแอร์ ซ่อมแอร์ ติดตั้ง และย้ายจุดติดตั้ง ในราคาโปร่งใสเริ่มต้นเพียง 400 บาท ดังที่ปรากฏในวิดีโอหน้างานจริง—เราให้ความเคารพต่อความสะอาดของบ้านตั้งแต่การถอดรองเท้าก่อนก้าวผ่านประตูกระจก การปูผ้าใบกันเปื้อน ไปจนถึงช่างในชุดยูนิฟอร์มสีน้ำเงินบนบันไดดำที่ถอดหน้ากาก ฟิลเตอร์ และฉีดล้างคอยล์ด้วยแรงดัน 150 PSI รองรับครบทั้ง 13 แบรนด์ชั้นนำ",
          timecode: "02 THRESHOLD & 03 PRECISION CARE",
        },
        {
          num: "03",
          subtitle: "สารจากผู้ก่อตั้ง (FOUNDER'S MESSAGE)",
          title: "ความไว้วางใจสูงสุดเมื่อเปิดบ้านต้อนรับทีมช่างของเรา",
          body:
            "ช่างทุกคนของ ฮูก แอร์เซอร์วิส ผ่านการฝึกอบรมทั้งทักษะวิศวกรรมเครื่องปรับอากาศอินเวอร์เตอร์ และมารยาทการปฏิบัติงานในที่พักอาศัย เพื่อส่งมอบทั้งความเย็นบริสุทธิ์และความสบายใจให้ทุกครอบครัว",
          timecode: "03 EXECUTIVE STANDARD",
        },
      ],
      founder: {
        eyebrow: "03 / สารจากผู้ก่อตั้ง — คำมั่นสัญญาจากใจ (FOUNDER'S MESSAGE)",
        quote:
          "เมื่อเราเริ่มต้น ฮูก แอร์เซอร์วิส เราตระหนักดีว่าการเปิดบ้านต้อนรับช่างเข้ามาในห้องนั่งเล่นต้องอาศัยความไว้วางใจสูงสุด เราจึงไม่ได้เป็นเพียงคนล้างแอร์ แต่เราคือผู้ปกป้องอากาศที่ครอบครัวคุณหายใจ เคารพความสะอาดของบ้านคุณ และดูแลความเป็นส่วนตัวและความสบายของคุณเสมือนเป็นบ้านของเราเอง",
        author: "ผู้ก่อตั้งและหัวหน้าทีมวิศวกรรมบริการ",
        role: "ฮูก แอร์เซอร์วิส (HOOK AIR SERVICE) • กรุงเทพฯ และปริมณฑล",
        signature: "Hook Air Service Executive Directorate",
      },
      milestones: [
        { value: "13+", label: "แบรนด์ชั้นนำระดับโลกที่เชี่ยวชาญ" },
        { value: "100%", label: "ถอดล้างลึกถึงแผงคอยล์และโพรงกระรอก" },
        { value: "400.-", label: "ราคาเริ่มต้นโปร่งใส (บาท)" },
      ],
      metrics: {
        units: { value: "13+", label: "แบรนด์ชั้นนำระดับโลกที่เชี่ยวชาญ" },
        warranty: { value: "100%", label: "ถอดล้างลึกถึงแผงคอยล์และโพรงกระรอก" },
        compliance: { value: "400.-", label: "ราคาเริ่มต้นโปร่งใส (บาท)" },
      },
    },
    services: {
      sectionIndex: "02 — บริการของเราและตารางราคามาตรฐาน",
      heading: "4 มาตรฐานบริการครบวงจร ราคาโปร่งใส",
      sub:
        "ออกแบบขั้นตอนการทำงานแยกตามโครงสร้างที่พักอาศัย ทั้งคอนโดมิเนียมอาคารสูง บ้านเดี่ยว และระบบแอร์ฝังฝ้า ไม่มีค่าใช้จ่ายแอบแฝงหน้างาน",
      bookProtocol: "เลือกจองบริการนี้",
      matrix: [
        {
          num: "01",
          category: "บริการสำหรับคอนโดมิเนียม",
          title: "ล้างแอร์คอนโดระบบปิด ไร้หยดน้ำกระเด็น",
          price: "฿550",
          unitNote: "/ เครื่อง (2 เครื่องขึ้นไป) • 1 เครื่อง ฿650",
          description:
            "ออกแบบเฉพาะสำหรับคอนโดมิเนียมที่มีระเบียงแคบและพื้นไม้ลามิเนต ใช้ปั๊มเสียงเงียบและฉากกั้นคอยล์ร้อนริมระเบียง ไม่รบกวนห้องข้างเคียง",
          specs: [
            "ดำเนินการแลกบัตรและเอกสารขออนุญาตทำงานกับนิติบุคคลครบถ้วน",
            "คลุมกรวยผ้าใบกันน้ำ 360 องศา ต่อท่อลงถังพักน้ำเสียระบบปิด",
            "กางฉากผ้าใบครอบคอยล์ร้อนริมระเบียง น้ำสกปรกไม่กระเด็นตกตึก",
            "อัดแรงดันไล่เมือกในท่อน้ำทิ้ง PVC พร้อมรับประกันน้ำหยด 30 วัน",
          ],
        },
        {
          num: "02",
          category: "บริการสำหรับบ้านเดี่ยวและทาวน์โฮม",
          title: "แพ็กเกจล้างแอร์บ้านพักอาศัยครบชุด",
          price: "฿500",
          unitNote: "/ เครื่อง (3 เครื่องขึ้นไป) • 1–2 เครื่อง ฿600",
          description:
            "จัดทีมช่าง 2 คนเข้าดูแลพร้อมกันสำหรับบ้านพักอาศัย ขจัดคราบฝุ่นสวน คราบไอน้ำมันจากการทำอาหาร และทะลวงท่อน้ำทิ้งยาวถึงรางระบายหลัก",
          specs: [
            "ตรวจวัดค่าแคปซิเตอร์ กระแสไฟคอมเพรสเซอร์ และอุณหภูมิ ΔT ก่อนล้าง",
            "ถอดพัดลมโพรงกระรอกและฉีดโฟมสลายคราบไขมันสำหรับแอร์ห้องโถง",
            "ฉีดล้างคราบดินโคลนและใบไม้ที่อุดตันแผงคอยล์ร้อนนอกตัวบ้าน",
            "อัดสายฉีดแรงดันสูงทะลวงท่อน้ำทิ้ง PVC ยาวตลอดแนวถึงรางน้ำ",
          ],
        },
        {
          num: "03",
          category: "ระบบแอร์เชิงพาณิชย์และเพนท์เฮาส์",
          title: "ล้างแอร์สี่ทิศทาง (4-Way Cassette) และแอร์ต่อท่อดักท์",
          price: "฿1,400",
          unitNote: "/ เครื่อง (18,000 – 48,000 BTU)",
          description:
            "ถอดล้างทำความสะอาดเชิงลึกสำหรับแอร์ฝังฝ้าเพดานสี่ทิศทางและแอร์เปลือยซ่อนฝ้า ในบ้านพักระดับลักชัวรีและโฮมออฟฟิศ",
          specs: [
            "ถอดล้างใบพัดเทอร์โบ ถาดรองน้ำทิ้ง และชุดลูกลอยสวิตช์ตัดน้ำ",
            "ล้างทำความสะอาดปั๊มเดรนน้ำทิ้ง (Condensate Pump) ป้องกันน้ำล้นฝ้า",
            "ทำความสะอาดหน้ากากกระจายลมและช่องเซอร์วิสฝ้าเพดาน",
            "ตรวจเช็คแรงดันน้ำยาแอร์ R32 / R410A และระบบไฟฟ้าครบชุด",
          ],
        },
        {
          num: "04",
          category: "ฟื้นฟูแอร์ตันสะสมหรือน้ำหยดเรื้อรัง",
          title: "ล้างใหญ่ฟื้นฟูแกนคอยล์และพ่นฆ่าเชื้อเกรดโรงพยาบาล",
          price: "฿850",
          unitNote: "/ เครื่อง (สำหรับแอร์ไม่ออกลมหรือเมือกอุดตันหนัก)",
          description:
            "โปรแกรมฟื้นฟูพิเศษสำหรับเครื่องปรับอากาศที่ไม่ได้ล้างนาน มีกลิ่นอับชื้นรุนแรง มีคราบราดำเกาะหนา หรือมีอาการน้ำแอร์หยดลงผนัง",
          specs: [
            "ฟอกโฟม pH-Neutral สลายคราบเมือกฝังลึกทั้งด้านหน้าและหลังแผงคอยล์",
            "อัดไนโตรเจนและน้ำแรงดันสูงเคลียร์ท่อเดรนน้ำทิ้งที่อุดตันเรื้อรัง",
            "พ่นละอองน้ำยาฆ่าเชื้อแบคทีเรียและสปอร์เชื้อรา Food-Grade",
            "วัดความเร็วลม (m/s) และอุณหภูมิลมออกเปรียบเทียบก่อน-หลังส่งมอบ",
          ],
        },
      ],
    },
    brands: {
      sectionIndex: "03 — ความเชี่ยวชาญเฉพาะแบรนด์ (13 แบรนด์ชั้นนำ)",
      heading: "13 แบรนด์ระดับโลก มาตรฐานเดียวที่เหนือกว่า",
      sub:
        "เครื่องปรับอากาศแต่ละแบรนด์มีสารเคลือบแผงคอยล์ ชุดปล่อยประจุไอออน และกลไกบานสวิงที่ต่างกัน คลิกเลือกแบรนด์เพื่อดูขั้นตอนการดูแลเฉพาะทางของเรา",
      dockLabel: "คลิกเลือกแบรนด์เครื่องปรับอากาศเพื่อดูเทคนิคการล้าง",
      techLabel: "01 / โครงสร้างและเทคโนโลยีเฉพาะแบรนด์",
      methodLabel: "02 / ขั้นตอนการดูแลโดย ฮูก แอร์เซอร์วิส",
      pressureLabel: "03 / แรงดันน้ำที่ปรับตั้งเฉพาะคอยล์",
      timeLabel: "04 / ระยะเวลามาตรฐานต่อเครื่อง",
      minutes: "นาที",
      preview: "ซิงค์แบรนด์นี้ขึ้นบนโมเดลหลัก",
      profiles: {
        daikin: {
          tech: "บานสวิง Coanda Airflow และชุดปล่อยประจุ Streamer",
          method:
            "ถอดบานสวิงคู่ Coanda และแยกชุดโมดูล Streamer แรงดันสูงออกก่อนอัดฉีดล้างคอยล์ Blue-Fin ด้วยแรงดัน 120 PSI อย่างปลอดภัย",
        },
        mitsubishi: {
          tech: "สารเคลือบ Dual Barrier Coating และโครงสร้างแกะล้างง่าย",
          method:
            "ใช้น้ำยา pH เป็นกลางและหัวฉีดมุมพัด 90 PSI เพื่อรักษาชั้นเคลือบฟลูออรีนป้องกันฝุ่นและคราบมัน Dual Barrier Coating ไม่ให้หลุดลอก",
        },
        carrier: {
          tech: "ระบบฟอกอากาศ Xpower Gold Ionizer และคอยล์ทำความสะอาดตัวเอง",
          method:
            "ซีลปิดชุด Xpower Ionizer กันความชื้น แล้วฉีดล้างด้านหลังแผงคอยล์และรางน้ำทิ้งส่วนลึกที่ระบบล้างอัตโนมัติเข้าไม่ถึง",
        },
        haier: {
          tech: "ระบบ Frost Self-Clean และฆ่าเชื้อด้วยความร้อน 56°C",
          method:
            "หุ้มหัววัดอุณหภูมิ Thermistor ก่อนถอดพัดลมโพรงกระรอกออกมาล้าง และอัดฉีดคราบตะกรันเมือกที่สะสมจากรอบน้ำแข็ง",
        },
        amena: {
          tech: "แผงคอยล์ทองแดงและฟินอะลูมิเนียมงานหนักสำหรับภูมิอากาศเมืองไทย",
          method:
            "อัดฉีดล้างเต็มกำลัง 150 PSI ทั้งสองฝั่งคอยล์ ขจัดฝุ่น PM2.5 หนาแน่นและไล่เมือกในท่อน้ำทิ้งคอนโดได้อย่างหมดจด",
        },
        samsung: {
          tech: "หน้ากากกระจายลม WindFree 23,000 Micro-Holes",
          method:
            "ถอดแผงหน้ากาก WindFree ออกมาฉีดเคลียร์รูระบายอากาศทั้ง 23,000 รู ให้โล่งสนิท ป้องกันอาการไอน้ำเกาะหน้ากากและลมไม่ออก",
        },
        toshiba: {
          tech: "สารเคลือบ Aqua-Resin Magic Coil และแผ่นกรอง Ultra-Pure",
          method:
            "ฉีดล้างด้วยม่านน้ำเรียบไม่ขูดขีดผิว Aqua-Resin Magic Coil พร้อมถอดล้อพัดลมโพรงกระรอกออกมาล้างฆ่าเชื้อนอกตัวเครื่อง",
        },
        tcl: {
          tech: "แผงคอยล์เคลือบสารไทเทเนียมทอง Titan Gold Fin",
          method:
            "เดินหัวฉีดแนวตั้งขนานร่องครีบฟิน ชะล้างคราบฝุ่นเหนียวออกจากแผงคอยล์ Titan Gold โดยครีบอะลูมิเนียมไม่ล้มพับ",
        },
        sharp: {
          tech: "ชุดกำเนิดไอออน Plasmacluster และบานสวิง Coanda ยาวพิเศษ",
          method:
            "ถอดตลับเข็มประจุ Plasmacluster ออกมาทำความสะอาดแบบแห้งแยกต่างหาก ก่อนล้างอัดฉีดแผงคอยล์เย็นและถาดน้ำทิ้งเต็มระบบ",
        },
        midea: {
          tech: "คอยล์ทอง PrimeGuard Golden Fin และระบบ Active Clean",
          method:
            "แยกชุดสายไฟและมอเตอร์บานสวิงออกจากโซนเปียก แล้วถอดล้างโพรงกระรอก รางน้ำทิ้งด้านหลัง และแผงคอยล์จนสะอาดใส",
        },
        fujitsu: {
          tech: "พัดลมโพรงกระรอกขนาดใหญ่พิเศษ และแผ่นกรอง Apple-Catechin",
          method:
            "ถอดแกนพัดลมโพรงกระรอกเส้นผ่านศูนย์กลางใหญ่ออกมาล้างคราบฝุ่นฝังแน่น พร้อมทำความสะอาดแผ่นกรอง Apple-Catechin",
        },
        lg: {
          tech: "คอมเพรสเซอร์ DUAL Inverter และแผงคอยล์ Gold Fin™",
          method:
            "ล้างด้วยแรงดัน 100 PSI ถนอมชั้นเคลือบป้องกันสนิม Gold Fin™ พร้อมตรวจวัดค่ากระแสไฟ (Amp) ของระบบอินเวอร์เตอร์หลังประกอบเสร็จ",
        },
        panasonic: {
          tech: "โมดูลปล่อยอนุภาค nanoe™ X และบานสวิงคู่ Aerowings",
          method:
            "คลุมป้องกันหัวพ่นอนุภาค nanoe™ X อย่างมิดชิด ก่อนถอดบานสวิงคู่ Aerowings โพรงกระรอก และถาดน้ำทิ้งออกมาล้างฆ่าเชื้อ",
        },
      },
    },
    slider: {
      sectionIndex: "เปรียบเทียบสภาพคอยล์เย็นก่อนและหลังล้าง",
      heading: "ฝุ่นสะสม 6 เดือนในกรุงเทพฯ สะอาดหมดจดในครั้งเดียว",
      sub: "ลากแถบแบ่งภาพเพื่อเปรียบเทียบแผงคอยล์ที่อุดตันด้วยเมือกและฝุ่น กับผลลัพธ์หลังล้างอัดฉีด 150 PSI",
      instruction: "ลากแถบซ้าย-ขวาเพื่อเปรียบเทียบ",
      ariaLabel: "เปรียบเทียบคอยล์แอร์ก่อนและหลังล้าง",
      before: {
        label: "01 / สภาพก่อนล้างใหญ่",
        temp: "19.8°C",
        blockage: "78%",
        energy: "+34%",
        summary: "เมือกวุ้นและฝุ่น PM2.5 อุดตันครีบคอยล์กว่า 78% ทำให้น้ำแอร์หยด ลมมีกลิ่นอับ และคอมเพรสเซอร์กินไฟหนัก",
      },
      after: {
        label: "02 / หลังล้างอัดฉีด 150 PSI",
        temp: "10.5°C",
        blockage: "0%",
        energy: "ตามสเปกโรงงาน",
        summary: "ครีบอะลูมิเนียมใสสะอาด โพรงกระรอกไร้ฝุ่นเกาะ ท่อน้ำทิ้งโล่งสนิท คืนลมเย็นฉ่ำบริสุทธิ์ทันที",
      },
      tempLabel: "อุณหภูมิลมออก",
      blockageLabel: "การอุดตันของครีบ",
      energyLabel: "อัตราการกินไฟ",
    },
    explorer: {
      heading: "ขั้นตอนที่ออกแบบเฉพาะสำหรับคอนโดและบ้านเดี่ยว",
      sub: "สลับดูระเบียบการปฏิบัติงานระหว่างคอนโดมิเนียมอาคารสูงและบ้านพักอาศัย",
      from: "อัตราค่าบริการสุทธิเริ่มต้น",
      perUnit: "/ เครื่อง",
      book: "จองแพ็กเกจนี้",
      profiles: {
        condo: {
          tab: "01 / คอนโดมิเนียม",
          line: "ดูแลเอกสารนิติบุคคล ปั๊มอินเวอร์เตอร์เสียงเงียบ พื้นห้องแห้งสะอาด 100%",
          price: "฿550",
          duration: "45–60 นาที / เครื่อง",
          units: "แพ็กเกจ 2 เครื่องขึ้นไป",
          steps: [
            { title: "คลุมกันเปื้อนระบบปิด", line: "ปูแผ่นรองพื้น หุ้มแผงวงจร PCB และต่อกรวยน้ำเสียลงถังปิดมิดชิด" },
            { title: "ถอดล้างโพรงกระรอก", line: "ถอดพัดลมโพรงกระรอกและถาดน้ำทิ้งออกมาล้างคราบดำนอกตัวเครื่อง" },
            { title: "กั้นคอยล์ร้อนริมระเบียง", line: "กางผ้าใบครอบคอยล์ร้อน น้ำสกปรกไม่กระเด็นเลอะห้องข้างเคียง" },
            { title: "ตรวจวัดผลดิจิทัล", line: "วัดอุณหภูมิลมออกและกระแสไฟ พร้อมส่งรายงานเข้า LINE ลูกค้า" },
          ],
        },
        house: {
          tab: "02 / บ้านเดี่ยวและทาวน์โฮม",
          line: "ทีมช่าง 2 คนเข้าปฏิบัติงานพร้อมกัน รองรับสูงสุด 8 เครื่องภายในวันเดียว",
          price: "฿500",
          duration: "40–50 นาที / เครื่อง",
          units: "แพ็กเกจ 3 เครื่องขึ้นไป",
          steps: [
            { title: "ตรวจเช็คสุขภาพแอร์", line: "วัดค่าแคปซิเตอร์ กระแสไฟคอมเพรสเซอร์ และ ΔT ทุกเครื่องก่อนล้าง" },
            { title: "อัดฉีดคอยล์ 150 PSI", line: "ฉีดล้างคอยล์เย็นสองด้าน พร้อมโฟมสลายคราบไอน้ำมันจากห้องครัว" },
            { title: "ล้างคอยล์ร้อนในสวน", line: "ชะล้างคราบดินโคลนและใบไม้ที่คอยล์ร้อน พร้อมทะลวงท่อน้ำทิ้ง PVC" },
            { title: "พ่นฆ่าเชื้อและเช็คน้ำยา", line: "พ่นสเปรย์ฆ่าเชื้อโรคและตรวจวัดแรงดันน้ำยาแอร์ R32/R410A" },
          ],
        },
      },
    },
    contact: {
      sectionIndex: "04 — ติดต่อเราและศูนย์จัดส่งทีมช่าง",
      heading: "พร้อมจัดส่งทีมช่างทั่วกรุงเทพฯ และปริมณฑล",
      sub:
        "ติดต่อฝ่ายจัดคิวงานได้โดยตรงทางโทรศัพท์ แชทผ่าน LINE Official หรือคำนวณราคาออนไลน์ ฟรีค่าเดินทางทั่วกรุงเทพฯ นนทบุรี ปทุมธานี และสมุทรปราการ",
      phoneTitle: "01 / สายด่วนจัดคิวช่าง",
      phonePrimary: "092-420-0043",
      phoneSecondary: "098-364-9865",
      phoneNote: "นัดหมายคิวงานด่วน และประสานงานเอกสารนิติบุคคลคอนโดมิเนียม",
      lineTitle: "02 / จองคิวผ่าน LINE OFFICIAL",
      lineHandle: "@airconpro.th",
      lineNote: "ส่งภาพหน้างาน ขอใบเสนอราคาหลายเครื่อง หรือจองคิวภายใน 3 นาที",
      hoursTitle: "03 / เวลาทำการ",
      hoursValue: "08:00 – 20:00 น. ทุกวัน",
      hoursSub: "เปิดให้บริการทุกวัน จันทร์ – อาทิตย์ ไม่เว้นวันหยุดนักขัตฤกษ์",
      coverageTitle: "04 / พื้นที่ให้บริการฟรีค่าเดินทาง",
      coverageSub: "สุขุมวิท • สาทร • สีลม • พระราม 9 • รัชดา • อารีย์ • จตุจักร • บางนา • ศรีนครินทร์ • ธนบุรี • นนทบุรี",
      primaryCta: "เปิดหน้าต่างคำนวณราคาและจองคิว",
      lineCta: "ทักแชท LINE Official",
    },
    serviceArea: {
      zones: [
        {
          id: "sukhumvit",
          name: "สุขุมวิท & อโศก-ทองหล่อ",
          areas: "อโศก, พร้อมพงษ์, ทองหล่อ, เอกมัย, อ่อนนุช, นานา, เพลินจิต",
          dispatchTime: "45 นาที",
          teamsActive: 5,
        },
        {
          id: "sathorn",
          name: "สีลม, สาทร & เจริญกรุง-พระราม 3",
          areas: "สาทร, สีลม, นราธิวาส, เจริญกรุง, พระราม 3, ไอคอนสยาม",
          dispatchTime: "50 นาที",
          teamsActive: 4,
        },
        {
          id: "rama9",
          name: "พระราม 9, รัชดา & ลาดพร้าว",
          areas: "พระราม 9, ห้วยขวาง, สุทธิสาร, ลาดพร้าว, รามคำแหง",
          dispatchTime: "45 นาที",
          teamsActive: 4,
        },
        {
          id: "ari",
          name: "อารีย์, พหลโยธิน & วิภาวดี",
          areas: "อนุสาวรีย์ฯ, อารีย์, สะพานควาย, จตุจักร, รัชโยธิน, ดอนเมือง",
          dispatchTime: "55 นาที",
          teamsActive: 3,
        },
        {
          id: "bangna",
          name: "บางนา, ศรีนครินทร์ & ประเวศ",
          areas: "แบริ่ง, บางนา-ตราด, เมกะบางนา, ศรีนครินทร์, พัฒนาการ",
          dispatchTime: "50 นาที",
          teamsActive: 4,
        },
        {
          id: "nonthaburi",
          name: "นนทบุรี, ธนบุรี & ราชพฤกษ์",
          areas: "รัตนาธิเบศร์, แจ้งวัฒนะ, ปิ่นเกล้า, ราชพฤกษ์, บางหว้า, ตากสิน",
          dispatchTime: "60 นาที",
          teamsActive: 3,
        },
      ],
    },
    modal: {
      title: "คำนวณราคาและจองคิวล้างแอร์ด่วน",
      subtitle: "เลือกประเภทที่พักและจำนวนแอร์เพื่อดูราคาสุทธิ หรือส่งข้อมูลจองคิวผ่าน LINE Official ได้ทันที",
      tabInstant: "จองคิวผ่านเว็บไซต์",
      tabLine: "จองผ่าน LINE Official",
      propertyTypeLabel: "1. ประเภทที่พักอาศัย",
      condoOption: "Condo Room (คอนโดมิเนียม)",
      houseOption: "House / Villa (บ้านพักอาศัย)",
      unitCountLabel: "2. จำนวนเครื่องปรับอากาศ",
      unitSuffix: "เครื่อง",
      zoneLabel: "3. โซนพื้นที่ให้บริการ",
      dateLabel: "วันที่ต้องการรับบริการ",
      timeSlotLabel: "ช่วงเวลาที่สะดวก",
      timeSlots: [
        "09:00 – 11:30 น. (รอบเช้า)",
        "13:00 – 15:30 น. (รอบบ่าย)",
        "16:00 – 18:30 น. (รอบเย็นหลังเลิกงาน)",
      ],
      nameLabel: "ชื่อผู้ติดต่อ / เลขห้องคอนโด",
      namePlaceholder: "เช่น คุณเมฆ / คอนโด Ideo ห้อง 1208",
      phoneLabel: "เบอร์โทรศัพท์ติดต่อ",
      phonePlaceholder: "08X-XXX-XXXX",
      estimatedTotal: "ยอดรวมสุทธิ (ไม่มีบวกเพิ่ม)",
      multiUnitDiscount: "ได้รับส่วนลดแพ็กเกจล้างหลายเครื่องแล้ว!",
      includesNote: "ราคารวมล้างใหญ่คอยล์เย็น-คอยล์ร้อน อัดท่อน้ำทิ้ง พ่นฆ่าเชื้อ และประกัน 30 วัน ชำระเงินหลังตรวจรับงาน",
      submitBookingBtn: "ยืนยันการจองคิว (ชำระเงินหลังล้างเสร็จ)",
      bookingSuccessTitle: "บันทึกคิวจองของคุณเรียบร้อยแล้ว!",
      bookingSuccessDesc:
        "เจ้าหน้าที่จัดคิวจะติดต่อกลับทางโทรศัพท์หรือ LINE ภายใน 10 นาที เพื่อยืนยันชื่อช่างและเตรียมเอกสารนิติบุคคล",
      bookingRefLabel: "รหัสอ้างอิงการจอง",
      resetBtn: "แก้ไขรายละเอียดการจอง",
      lineBox: {
        headline: "สะดวกจองผ่าน LINE? กดคัดลอกรหัสแล้วทักแชทได้เลย",
        subtext:
          "ระบบสรุปรายการและราคาแพ็กเกจของคุณไว้ด้านล่างแล้ว กดคัดลอกเพื่อส่งให้แอดมินทาง LINE Official ได้ทันที",
        lineIdLabel: "LINE Official ID",
        lineIdValue: "@airconpro.th",
        copyBtn: "คัดลอก LINE ID และสรุปยอดจอง",
        copiedBtn: "คัดลอกลงคลิปบอร์ดแล้ว!",
        autoMessageLabel: "ข้อความสรุปรายการจองของคุณ:",
        openLineBtn: "เปิดแอป LINE (@airconpro.th)",
        responseGuarantee: "แอดมินตอบกลับภายใน 3 นาที (เปิดบริการทุกวัน 08:00–21:00 น.)",
      },
    },
    footer: {
      companyDesc:
        "ผู้เชี่ยวชาญด้านการล้างทำความสะอาดและฆ่าเชื้อเครื่องปรับอากาศสำหรับคอนโดมิเนียมและบ้านพักอาศัย ช่างผ่านการอบรมกรมพัฒนาฝีมือแรงงาน ตรวจสอบประวัติอาชญากรรมทุกคน",
      hoursLabel: "เวลาทำการจัดส่งทีมช่าง",
      hoursValue: "08:00 – 20:00 น. (เปิดบริการทุกวัน ไม่เว้นวันหยุดนักขัตฤกษ์)",
      licenseText: "ทีมช่างผ่านการรับรองมาตรฐานฝีมือแรงงานแห่งชาติ • ออกใบกำกับภาษีเต็มรูปแบบได้",
      copyright: "© 2026 บริษัท ฮูก แอร์เซอร์วิส จำกัด (Hook Air Service Co., Ltd.) สงวนลิขสิทธิ์",
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "aircon-service-pro-lang";
const LANG_CHANGE_EVENT = "aircon-lang-change";

function subscribeLanguage(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(LANG_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(LANG_CHANGE_EVENT, callback);
  };
}

function getLanguageSnapshot(): Language {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === "th" ? "th" : "en";
  } catch {
    return "en";
  }
}

function getServerLanguageSnapshot(): Language {
  return "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(
    subscribeLanguage,
    getLanguageSnapshot,
    getServerLanguageSnapshot
  );

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
      window.dispatchEvent(new Event(LANG_CHANGE_EVENT));
    } catch {
      // Ignore storage write error
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === "en" ? "th" : "en");
  }, [language, setLanguage]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
