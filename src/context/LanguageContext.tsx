"use client";

import React, { createContext, useContext, useSyncExternalStore, useEffect, useCallback } from "react";

export type Language = "en" | "th";

export interface StepItem {
  stepNumber: string;
  title: string;
  duration: string;
  equipment: string;
  description: string;
  highlight: string;
}

export interface PricingTier {
  label: string;
  btuRange: string;
  pricePerUnit: string;
  originalPrice?: string;
  badge?: string;
  note: string;
}

export interface PropertyProfile {
  id: "condo" | "house";
  tabLabel: string;
  tabSub: string;
  headline: string;
  summary: string;
  protectionGuarantee: string;
  avgDuration: string;
  warrantyText: string;
  steps: StepItem[];
  pricing: PricingTier[];
  checklist: string[];
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
    brandTagline: string;
    comparison: string;
    propertyTypes: string;
    serviceAreas: string;
    bookCleaning: string;
    staffPortal: string;
    langSwitchLabel: string;
  };
  hero: {
    titleLine1: string;
    titleHighlight: string;
    titleLine2: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    lineCta: string;
    warrantyBadge: string;
    juristicBadge: string;
    pricingStart: string;
    floatingBadges: {
      tempDrop: { value: string; label: string; detail: string };
      hygiene: { value: string; label: string; detail: string };
      billSaving: { value: string; label: string; detail: string };
    };
    liveUnit: {
      header: string;
      status: string;
      supplyTempLabel: string;
      airflowLabel: string;
      powerDrawLabel: string;
      coilStatusLabel: string;
      coilStatusValue: string;
      simulateBoostBtn: string;
      boostActiveBtn: string;
    };
    stats: {
      unitsCleaned: { value: string; label: string };
      onTimeRate: { value: string; label: string };
      leakWarranty: { value: string; label: string };
      rating: { value: string; label: string };
    };
  };
  slider: {
    heading: string;
    description: string;
    instruction: string;
    presetDirty: string;
    presetSplit: string;
    presetClean: string;
    before: {
      badge: string;
      title: string;
      subtitle: string;
      finBlockage: string;
      finBlockageVal: string;
      supplyTemp: string;
      supplyTempVal: string;
      powerDraw: string;
      powerDrawVal: string;
      airQuality: string;
      airQualityVal: string;
      bullets: string[];
    };
    after: {
      badge: string;
      title: string;
      subtitle: string;
      finBlockage: string;
      finBlockageVal: string;
      supplyTemp: string;
      supplyTempVal: string;
      powerDraw: string;
      powerDrawVal: string;
      airQuality: string;
      airQualityVal: string;
      bullets: string[];
    };
  };
  explorer: {
    heading: string;
    description: string;
    selectPrompt: string;
    durationLabel: string;
    warrantyLabel: string;
    equipmentLabel: string;
    pricingTitle: string;
    pricingSubtitle: string;
    bookThisPackage: string;
    includedTitle: string;
    profiles: {
      condo: PropertyProfile;
      house: PropertyProfile;
    };
  };
  serviceArea: {
    heading: string;
    description: string;
    filterLabel: string;
    dispatchLabel: string;
    activeTeamsLabel: string;
    bookInZoneCta: string;
    noSurchargeNote: string;
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
      brandName: "AIRCON SERVICE PRO",
      brandTagline: "Bangkok Deep-Clean & Sanitization",
      comparison: "Before & After",
      propertyTypes: "Condo vs. House",
      serviceAreas: "Service Zones",
      bookCleaning: "Book Cleaning",
      staffPortal: "Staff Portal",
      langSwitchLabel: "Switch language between English and Thai",
    },
    hero: {
      titleLine1: "Hospital-Grade Aircon",
      titleHighlight: "Deep Cleaning",
      titleLine2: "for Bangkok Condos & Homes",
      subtitle:
        "Eliminate hidden black mold, clogged drain-line leaks, and high MEA electricity bills. Our certified technicians disassemble and sanitize every evaporator coil, blower wheel, and condenser with zero mess guaranteed.",
      primaryCta: "Book Cleaning Now",
      secondaryCta: "Test Before / After Slider",
      lineCta: "Quick Book via LINE",
      warrantyBadge: "30-Day Water Leak & Cooling Warranty",
      juristicBadge: "100% Condo Juristic Work-Permit Compliant",
      pricingStart: "Transparent rates from ฿550 / unit",
      floatingBadges: {
        tempDrop: {
          value: "-4.5°C",
          label: "Supply Air Cooling Boost",
          detail: "Restores factory heat-exchange efficiency",
        },
        hygiene: {
          value: "99.9%",
          label: "Mold & Biofilm Removed",
          detail: "Food-grade coil disinfectant misting",
        },
        billSaving: {
          value: "Up to 28%",
          label: "Lower Monthly MEA Bill",
          detail: "Reduces inverter compressor strain",
        },
      },
      liveUnit: {
        header: "LIVE COIL TELEMETRY SIMULATION",
        status: "DEEP-CLEANED INVERTER UNIT",
        supplyTempLabel: "Discharge Temp",
        airflowLabel: "Airflow Velocity",
        powerDrawLabel: "Compressor Draw",
        coilStatusLabel: "Evaporator Core",
        coilStatusValue: "Sanitized & Unobstructed",
        simulateBoostBtn: "Preview Jet-Wash Airflow",
        boostActiveBtn: "Max Arctic Airflow Active",
      },
      stats: {
        unitsCleaned: { value: "18,400+", label: "Units Deep-Cleaned in BKK" },
        onTimeRate: { value: "99.4%", label: "On-Time Arrival Rate" },
        leakWarranty: { value: "30 Days", label: "No-Drip Warranty Coverage" },
        rating: { value: "4.9 / 5.0", label: "Verified Homeowner Rating" },
      },
    },
    slider: {
      heading: "See What Hides Inside an Unwashed Aircon Coil",
      description:
        "Drag the interactive inspection divider below to compare a 6-month unwashed evaporator coil against our 150-bar precision chemical-free deep cleaning result.",
      instruction: "Drag handle left or right — or click a view preset",
      presetDirty: "Show Clogged Unit",
      presetSplit: "50/50 Comparison",
      presetClean: "Show Sanitized Unit",
      before: {
        badge: "BEFORE: 6 MONTHS UNWASHED",
        title: "Dusty, Clogged Aircon Unit (High Electricity Bill & Bacteria)",
        subtitle:
          "Biofilm slime, PM2.5 dust cake, and damp mold block up to 78% of aluminum cooling fins—forcing the compressor to run nonstop.",
        finBlockage: "Coil Fin Blockage",
        finBlockageVal: "78% Obstructed",
        supplyTemp: "Vent Discharge Temp",
        supplyTempVal: "19.8°C (Warm & Humid)",
        powerDraw: "Electricity Penalty",
        powerDrawVal: "+34% Excess kWh",
        airQuality: "Microbial Hazard",
        airQualityVal: "Black Mold & Jelly Slime",
        bullets: [
          "foul musty smell during the first 15 minutes after turning on",
          "Jelly-like biofilm clogs the drain tray, causing sudden wall water leaks",
          "Blower squirrel-cage coated in sticky dust, cutting room airflow in half",
        ],
      },
      after: {
        badge: "AFTER: PRO DEEP SANITIZATION",
        title: "Deep-Cleaned, Sanitized Aircon Unit (Ice-Cold Airflow & 100% Hygienic)",
        subtitle:
          "High-pressure V-jet coil flushing, blower barrel disassembly, and quaternary ammonium sanitization restore crisp, odor-free cooling.",
        finBlockage: "Coil Fin Blockage",
        finBlockageVal: "0% (100% Clear Core)",
        supplyTemp: "Vent Discharge Temp",
        supplyTempVal: "10.5°C (Ice-Cold)",
        powerDraw: "Electricity Penalty",
        powerDrawVal: "Optimal Factory Spec",
        airQuality: "Microbial Hazard",
        airQualityVal: "99.9% Sanitized & Fresh",
        bullets: [
          "Full dismantling of front casing, louvers, drain pan, and cross-flow fan",
          "Nitrogen & high-pressure flushing clears the entire PVC drain line",
          "Zero chemical residue — safe for infants, pets, and allergy sufferers",
        ],
      },
    },
    explorer: {
      heading: "Tailored Protocols for Condos vs. Houses",
      description:
        "Cleaning an aircon on a narrow 32nd-floor Bangkok condo balcony requires completely different containment gear than a multi-split suburban villa. Select your property type below.",
      selectPrompt: "Select property architecture to inspect step-by-step protocol:",
      durationLabel: "Service Time",
      warrantyLabel: "Protection",
      equipmentLabel: "Specialized Rig",
      pricingTitle: "Transparent All-Inclusive Rates",
      pricingSubtitle: "No hidden charges for drain flushing, antibacterial spray, or condo work-permit paperwork.",
      bookThisPackage: "Book This Protocol",
      includedTitle: "Included in Every Visit",
      profiles: {
        condo: {
          id: "condo",
          tabLabel: "Condo Room (คอนโด)",
          tabSub: "High-Rise & Studio / 1–3 Bed Units",
          headline: "Zero-Splash High-Rise Condominium Protocol",
          summary:
            "Engineered specifically for Bangkok condominiums (Sansiri, AP, Ananda, Noble, LPN). We coordinate directly with your Juristic Office, protect engineered wood floors, and use enclosed balcony condenser shrouds so zero dirty water drips onto neighboring units.",
          protectionGuarantee: "100% Dry Floor & Balcony Containment Guarantee",
          avgDuration: "45–60 mins / unit",
          warrantyText: "30-Day Water Leak & Odor Warranty",
          steps: [
            {
              stepNumber: "STEP 01",
              title: "Juristic Check-In & 360° Room Waterproofing",
              duration: "10 mins",
              equipment: "Waterproof Ripstop Funnel + EVA Floor Mats",
              description:
                "Technicians register at your building's Juristic Office, lay down padded floor protection, seal the indoor PCB electronics box in a dry bag, and mount a sealed wastewater funnel directly into a closed recovery tank.",
              highlight: "Protects wallpaper, curtains, and laminate flooring",
            },
            {
              stepNumber: "STEP 02",
              title: "Blower Wheel Dismantling & V-Jet Evaporator Flush",
              duration: "20 mins",
              equipment: "Low-dB Inverter Pump (90 Bar Fin-Safe Nozzle)",
              description:
                "We remove the louver blades, washable filters, drain tray, and cylindrical blower wheel. A precision 25-degree fan jet flushes embedded PM2.5 dust and dark mold from both front and rear coil faces without bending delicate fins.",
              highlight: "Whisper-quiet pump complies with condo noise rules",
            },
            {
              stepNumber: "STEP 03",
              title: "Balcony Condenser Shield & Drain-Line Purge",
              duration: "15 mins",
              equipment: "Balcony Splash Guard + High-Pressure Drain Gun",
              description:
                "Tight condo balconies trap exhaust heat. We wrap the outdoor condensing unit in a splash-proof curtain before washing the heat-rejecting fins, then pressure-flush the internal condensate drain pipe to prevent ceiling leaks.",
              highlight: "Zero overspray onto neighbor balconies or facade",
            },
            {
              stepNumber: "STEP 04",
              title: "Food-Grade Anti-Bacterial Misting & Airflow Audit",
              duration: "10 mins",
              equipment: "ULV Cold Fogger + Digital Anemometer",
              description:
                "Coils are misted with a non-corrosive botanical disinfectant certified against Legionella and household mold. We reassemble the unit, blow-dry all panels, and verify vent discharge temperature and AMP draw.",
              highlight: "Digital before/after inspection report sent to your LINE",
            },
          ],
          pricing: [
            {
              label: "1 Condo Unit",
              btuRange: "9,000 – 24,000 BTU (Wall-Mounted)",
              pricePerUnit: "฿650",
              note: "Ideal for Studio / 1-Bedroom routine deep clean",
            },
            {
              label: "2 – 3 Condo Units",
              btuRange: "9,000 – 24,000 BTU (Wall-Mounted)",
              pricePerUnit: "฿550 / unit",
              originalPrice: "฿650",
              badge: "MOST POPULAR CONDO PACK",
              note: "Save ฿200–฿300 total — best for 1-Bed Plus & 2-Bedroom condos",
            },
            {
              label: "Concealed Duct / Cassette",
              btuRange: "18,000 – 36,000 BTU (Luxury Condo)",
              pricePerUnit: "฿1,400 / unit",
              note: "Includes ceiling access panel cleaning & condensate pump check",
            },
          ],
          checklist: [
            "Juristic Office contractor registration & ID deposit handled",
            "Closed wastewater tank — we dispose of dirty water in bathroom drain",
            "Free R32 / R410A refrigerant pressure & electrical current check",
            "30-day free callback if unit drips or smells musty",
          ],
        },
        house: {
          id: "house",
          tabLabel: "House / Villa (บ้านพักอาศัย)",
          tabSub: "Detached Homes, Townhomes & Multi-Unit Villas",
          headline: "Heavy-Duty Residential & Multi-Unit Villa Protocol",
          summary:
            "Houses and townhomes face heavier outdoor dust, garden pollen, gecko nests in outdoor condensers, and long PVC drainage runs that clog with algae. Our 2-person residential crew services up to 8 units in a single visit.",
          protectionGuarantee: "Full Indoor & Outdoor Garden Condenser Restoration",
          avgDuration: "40–50 mins / unit",
          warrantyText: "30-Day Full System & Drain Line Warranty",
          steps: [
            {
              stepNumber: "STEP 01",
              title: "Multi-Unit Thermal & Electrical Health Audit",
              duration: "10 mins",
              equipment: "Clamp Ammeter + Infrared Thermometer",
              description:
                "Before washing, our lead technician tests every unit's starting capacitor, compressor amperage, and supply/return temperature delta (ΔT) to spot weak refrigerant or aging parts early.",
              highlight: "Prevents sudden summer breakdowns across bedroom & living units",
            },
            {
              stepNumber: "STEP 02",
              title: "Deep Disassembly & 150-Bar Dual-Side Evaporator Wash",
              duration: "20 mins",
              equipment: "150-Bar Adjustable Pressure Rig + Coil Alkaline Foam",
              description:
                "Full removal of housing, drain pan, and squirrel-cage fan barrel. Organic biodegradable coil foam lifts kitchen grease and pet dander from living-room units before a thorough high-volume rinse.",
              highlight: "Removes cooking oil film common in open-plan house kitchens",
            },
            {
              stepNumber: "STEP 03",
              title: "Outdoor Condenser Descaling & Main PVC Drain Flush",
              duration: "15 mins",
              equipment: "Exterior Jet Lance + 15-Meter Drain Snake Jet",
              description:
                "Outdoor house compressors collect mud, leaves, and insect debris. We deep-flush outdoor condenser fins to drop head pressure, then blast clear the exterior PVC drain pipe all the way to the garden gutter.",
              highlight: "Cuts compressor running amperage by up to 28%",
            },
            {
              stepNumber: "STEP 04",
              title: "Anti-Allergen Sanitization & Refrigerant PSI Verification",
              duration: "10 mins",
              equipment: "Digital Manifold Gauge + Anti-Microbial Mist",
              description:
                "Every indoor unit receives an antibacterial mist treatment. We verify R32/R410A operating pressure at the outdoor service valve and hand over a unit-by-unit maintenance scorecard.",
              highlight: "Complete health report for all household air conditioners",
            },
          ],
          pricing: [
            {
              label: "1 – 2 House Units",
              btuRange: "9,000 – 24,000 BTU (Wall-Mounted)",
              pricePerUnit: "฿600 / unit",
              note: "Includes indoor & outdoor unit deep wash",
            },
            {
              label: "3 – 5 House Units",
              btuRange: "9,000 – 30,000 BTU (Whole-Home Pack)",
              pricePerUnit: "฿500 / unit",
              originalPrice: "฿650",
              badge: "BEST FAMILY VALUE",
              note: "Save up to ฿750 — ideal for 3-bedroom townhomes & detached houses",
            },
            {
              label: "4-Way Ceiling Cassette",
              btuRange: "24,000 – 48,000 BTU (Living / Office)",
              pricePerUnit: "฿1,500 / unit",
              note: "Full grill, condensate float switch & centrifugal fan overhaul",
            },
          ],
          checklist: [
            "2-technician team for fast multi-room turnaround",
            "High-reach ladder & outdoor wall bracket inspection included",
            "Kitchen grease & pet hair removal treatment at no extra cost",
            "30-day warranty covering all serviced units in the household",
          ],
        },
      },
    },
    serviceArea: {
      heading: "Same-Day Dispatch Across Greater Bangkok",
      description:
        "Our mobile service vans are stationed near major BTS/MRT corridors and suburban ring roads—zero travel surcharge within our 7 primary coverage zones.",
      filterLabel: "Click any zone to pre-select it for booking:",
      dispatchLabel: "Avg. Dispatch",
      activeTeamsLabel: "Teams Ready",
      bookInZoneCta: "Open Quick Booking & Calculator",
      noSurchargeNote: "Zero travel fee across Bangkok, Nonthaburi, Samut Prakan & Pathum Thani",
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
      copyright: "© 2026 Aircon Service Pro Co., Ltd. All rights reserved.",
    },
  },
  th: {
    nav: {
      brandName: "AIRCON SERVICE PRO",
      brandTagline: "บริการล้างแอร์ฆ่าเชื้อมาตรฐานโรงพยาบาล",
      comparison: "เปรียบเทียบก่อน-หลังล้าง",
      propertyTypes: "คอนโด vs บ้านเดี่ยว",
      serviceAreas: "พื้นที่ให้บริการ",
      bookCleaning: "จองคิวล้างแอร์",
      staffPortal: "ระบบพนักงาน",
      langSwitchLabel: "สลับภาษาระหว่างภาษาอังกฤษและภาษาไทย",
    },
    hero: {
      titleLine1: "บริการล้างแอร์ใหญ่ฆ่าเชื้อ",
      titleHighlight: "สะอาดลึกถึงแกนคอยล์",
      titleLine2: "สำหรับคอนโดและบ้านพักอาศัยทั่วกรุงเทพฯ",
      subtitle:
        "บอกลาแอร์ไม่เย็น น้ำแอร์หยด กลิ่นอับชื้น และค่าไฟพุ่งสูง ทีมช่างมืออาชีพถอดล้างคอยล์เย็น โพรงกระรอก ถาดน้ำทิ้ง และฉีดพ่นน้ำยาฆ่าเชื้อเกรดโรงพยาบาล คลุมผ้าใบกันเปื้อน 100% พื้นไม่เลอะ",
      primaryCta: "จองคิวล้างแอร์ด่วน",
      secondaryCta: "ทดลองเลื่อนดูคอยล์ก่อน-หลังล้าง",
      lineCta: "จองผ่าน LINE Official",
      warrantyBadge: "รับประกันน้ำแอร์หยดและแอร์ไม่เย็นนาน 30 วัน",
      juristicBadge: "ดำเนินการเอกสารนิติบุคคลคอนโดครบถ้วน 100%",
      pricingStart: "ราคาโปร่งใส เริ่มต้นเพียง ฿500 / เครื่อง",
      floatingBadges: {
        tempDrop: {
          value: "-4.5°C",
          label: "ลมแอร์เย็นเร็วและฉ่ำขึ้นทันที",
          detail: "คืนประสิทธิภาพการแลกเปลี่ยนความร้อนเต็ม 100%",
        },
        hygiene: {
          value: "99.9%",
          label: "ขจัดเชื้อราและเมือกสะสม",
          detail: "พ่นน้ำยาฆ่าเชื้อ Food-Grade ปลอดภัยต่อเด็กและสัตว์เลี้ยง",
        },
        billSaving: {
          value: "สูงสุด 28%",
          label: "ประหยัดค่าไฟฟ้าต่อเดือน",
          detail: "ลดภาระการทำงานหนักของคอมเพรสเซอร์อินเวอร์เตอร์",
        },
      },
      liveUnit: {
        header: "จำลองค่าสถานะแอร์หลังล้างใหญ่ (LIVE TELEMETRY)",
        status: "คอยล์สะอาด ปลอดเชื้อรา 100%",
        supplyTempLabel: "อุณหภูมิลมออก",
        airflowLabel: "ความแรงลมส่ง",
        powerDrawLabel: "กระแสไฟคอมเพรสเซอร์",
        coilStatusLabel: "สถานะแผงคอยล์เย็น",
        coilStatusValue: "สะอาดโล่ง ไม่มีการอุดตัน",
        simulateBoostBtn: "ทดสอบโหมดลมเย็นสุดขั้ว",
        boostActiveBtn: "เปิดโหมดลมเย็นฉ่ำสูงสุดแล้ว",
      },
      stats: {
        unitsCleaned: { value: "18,400+", label: "เครื่องที่ผ่านการล้างใหญ่ใน กทม." },
        onTimeRate: { value: "99.4%", label: "เข้าหน้างานตรงเวลาตามนัดหมาย" },
        leakWarranty: { value: "30 วัน", label: "รับประกันอาการน้ำหยดทุกกรณี" },
        rating: { value: "4.9 / 5.0", label: "คะแนนรีวิวจากเจ้าของบ้านและคอนโด" },
      },
    },
    slider: {
      heading: "เปิดให้เห็นชัดๆ สิ่งสกปรกที่ซ่อนอยู่ในคอยล์แอร์ของคุณ",
      description:
        "ลากแถบเลื่อนด้านล่างเพื่อเปรียบเทียบระหว่างแผงคอยล์แอร์ที่ไม่ได้ล้างนาน 6 เดือน กับผลลัพธ์หลังล้างใหญ่ด้วยปั๊มแรงดันสูงหัวฉีด V-Jet และพ่นฆ่าเชื้อมาตรฐานมืออาชีพ",
      instruction: "ลากปุ่มซ้าย-ขวา หรือคลิกปุ่มเลือกมุมมองด้านล่าง",
      presetDirty: "ดูสภาพแอร์ตันก่อนล้าง",
      presetSplit: "เปรียบเทียบ 50/50",
      presetClean: "ดูสภาพแอร์สะอาดหลังล้าง",
      before: {
        badge: "ก่อนล้าง: สะสมฝุ่นและเมือก 6 เดือน",
        title: "คอยล์แอร์อุดตันด้วยฝุ่นและเมือกสะสม (กินไฟสูงและเป็นแหล่งสะสมเชื้อโรค)",
        subtitle:
          "คราบเมือกเหนียว ฝุ่น PM2.5 และเชื้อราดำอุดตันครีบอะลูมิเนียมกว่า 78% ทำให้ลมผ่านไม่ได้ คอมเพรสเซอร์ต้องเดินเครื่องหนักตลอดเวลา",
        finBlockage: "การอุดตันของครีบคอยล์",
        finBlockageVal: "อุดตัน 78%",
        supplyTemp: "อุณหภูมิลมหน้าช่องแอร์",
        supplyTempVal: "19.8°C (ลมเบาและเหนียวตัว)",
        powerDraw: "อัตราการกินไฟส่วนเกิน",
        powerDrawVal: "กินไฟเพิ่ม +34%",
        airQuality: "ความเสี่ยงต่อสุขภาพ",
        airQualityVal: "สปอร์เชื้อราและกลิ่นอับชื้น",
        bullets: [
          "มีกลิ่นอับชื้นพุ่งออกมาทุกครั้งในช่วง 15 นาทีแรกที่เปิดแอร์",
          "เมือกวุ้นขาวอุดตันถาดน้ำทิ้งและท่อ PVC ทำให้น้ำแอร์ล้นหยดลงผนังห้อง",
          "ใบพัดโพรงกระรอกมีฝุ่นเกาะหนา ทำให้แรงลมตกและมีเสียงดังรบกวน",
        ],
      },
      after: {
        badge: "หลังล้าง: สะอาดลึก ฆ่าเชื้อ 100%",
        title: "ล้างใหญ่ฆ่าเชื้อสะอาดลึกถึงแกนคอยล์ (ลมเย็นฉ่ำ ประหยัดไฟ ปลอดภัย 100%)",
        subtitle:
          "ถอดล้างโพรงกระรอก ถาดน้ำทิ้ง อัดฉีดแผงคอยล์ด้วยหัวฉีด V-Jet ถนอมครีบฟิน พร้อมพ่นสเปรย์ฆ่าเชื้อเกรดโรงพยาบาล",
        finBlockage: "การอุดตันของครีบคอยล์",
        finBlockageVal: "0% (ครีบคอยล์ใสสะอาด)",
        supplyTemp: "อุณหภูมิลมหน้าช่องแอร์",
        supplyTempVal: "10.5°C (เย็นฉ่ำทันใจ)",
        powerDraw: "อัตราการกินไฟส่วนเกิน",
        powerDrawVal: "ประหยัดไฟตามเกณฑ์โรงงาน",
        airQuality: "ความเสี่ยงต่อสุขภาพ",
        airQualityVal: "ปลอดเชื้อโรค 99.9% ลมสะอาดสดชื่น",
        bullets: [
          "ถอดหน้ากาก บานสวิง ถาดน้ำทิ้ง และพัดลมโพรงกระรอกออกมาล้างทุกชิ้น",
          "อัดแรงดันไล่เมือกในท่อน้ำทิ้ง PVC จนโล่ง ป้องกันปัญหาน้ำแอร์หยดซ้ำ",
          "ไร้สารเคมีกัดกร่อนตกค้าง ปลอดภัยต่อเด็กเล็ก ผู้สูงอายุ และผู้แพ้ง่าย",
        ],
      },
    },
    explorer: {
      heading: "ขั้นตอนการล้างแอร์ที่ออกแบบเฉพาะสำหรับ 'คอนโด' และ 'บ้านพักอาศัย'",
      description:
        "การล้างแอร์ในคอนโดสูงที่มีระเบียงแคบและกฎนิติบุคคลเข้มงวด ต้องใช้อุปกรณ์กักเก็บน้ำและกันกระเด็นที่แตกต่างจากบ้านเดี่ยว เลือกประเภทที่พักของคุณเพื่อดูขั้นตอนการทำงาน",
      selectPrompt: "เลือกประเภทที่พักอาศัยเพื่อดูมาตรฐานการให้บริการ:",
      durationLabel: "ระยะเวลาทำงาน",
      warrantyLabel: "การรับประกัน",
      equipmentLabel: "อุปกรณ์เฉพาะทาง",
      pricingTitle: "ตารางราคาสุทธิ ไม่มีบวกเพิ่มหน้างาน",
      pricingSubtitle: "รวมค่าอัดท่อน้ำทิ้ง พ่นน้ำยาฆ่าเชื้อ เช็คแรงดันน้ำยาแอร์ และประสานงานนิติบุคคลเรียบร้อยแล้ว",
      bookThisPackage: "จองแพ็กเกจนี้ทันที",
      includedTitle: "มาตรฐานที่คุณจะได้รับทุกครั้ง",
      profiles: {
        condo: {
          id: "condo",
          tabLabel: "Condo Room (คอนโด)",
          tabSub: "ห้องสตูดิโอ / 1–3 ห้องนอน บนอาคารสูง",
          headline: "มาตรฐานล้างแอร์คอนโด ไร้หยดน้ำเลอะพื้นและระเบียงห้องข้างเคียง",
          summary:
            "ออกแบบมาเพื่อผู้อยู่อาศัยคอนโดในกรุงเทพฯ โดยเฉพาะ (Sansiri, AP, Ananda, Noble, LPN ฯลฯ) ทีมช่างแลกบัตรนิติบุคคล ปูผ้ายางกันรอยพื้นลามิเนต และใช้ชุดคลุมคอยล์ร้อนริมระเบียงเพื่อไม่ให้น้ำกระเด็นออกนอกตัวอาคาร",
          protectionGuarantee: "รับประกันพื้นไม้ลามิเนตและผนังห้องแห้งสะอาด 100%",
          avgDuration: "45–60 นาที / เครื่อง",
          warrantyText: "รับประกันน้ำหยดและกลิ่นอับ 30 วันเต็ม",
          steps: [
            {
              stepNumber: "ขั้นตอน 01",
              title: "ลงทะเบียนนิติบุคคล และคลุมผ้าใบกันน้ำ 360 องศา",
              duration: "10 นาที",
              equipment: "ผ้าใบกันน้ำเกรด Ripstop + แผ่นรองพื้น EVA",
              description:
                "ช่างแลกบัตรและแจ้งนิติบุคคลตามระเบียบอาคาร ปูผ้ารองพื้นกันรอยขีดข่วน หุ้มแผงวงจรไฟฟ้า (PCB) ด้วยถุงกันน้ำสองชั้น และติดตั้งกรวยผ้าใบต่อท่อลงถังเก็บน้ำเสียแบบปิดมิดชิด",
              highlight: "ปกป้องวอลเปเปอร์ ผ้าม่าน เตียงนอน และพื้นไม้ลามิเนต",
            },
            {
              stepNumber: "ขั้นตอน 02",
              title: "ถอดล้างพัดลมโพรงกระรอก และฉีดล้างคอยล์เย็นด้วยหัว V-Jet",
              duration: "20 นาที",
              equipment: "ปั๊มแรงดันอินเวอร์เตอร์เสียงเงียบ (90 บาร์ ถนอมครีบฟิน)",
              description:
                "ถอดแผ่นกรอง หน้ากาก ถาดรองน้ำทิ้ง และแกนพัดลมโพรงกระรอกออกมาล้างคราบดำ ใช้หัวฉีดมุมเฉียง 25 องศา อัดล้างฝุ่น PM2.5 และเมือกในซอกแผงคอยล์ทั้งด้านหน้าและด้านหลังโดยครีบไม่ล้ม",
              highlight: "ปั๊มน้ำเสียงเงียบ ไม่รบกวนห้องข้างเคียงตามกฎคอนโด",
            },
            {
              stepNumber: "ขั้นตอน 03",
              title: "ฉีดล้างคอยล์ร้อนริมระเบียงแบบมีฉากกั้น & อัดไล่ท่อน้ำทิ้ง",
              duration: "15 นาที",
              equipment: "ฉากผ้าใบกั้นระเบียง + ปืนอัดแรงดันล้างท่อน้ำทิ้ง",
              description:
                "ระเบียงคอนโดมักแคบและสะสมความร้อนสูง ช่างจะกางผ้าใบครอบคอยล์ร้อนก่อนฉีดล้างคราบเขม่าควันรถ พร้อมใช้อุปกรณ์อัดแรงดันไล่เมือกอุดตันในท่อน้ำทิ้งให้ไหลลงท่อหลักอย่างรวดเร็ว",
              highlight: "น้ำสกปรกไม่กระเด็นตกตึกหรือเลอะระเบียงห้องข้างเคียง",
            },
            {
              stepNumber: "ขั้นตอน 04",
              title: "พ่นสเปรย์ฆ่าเชื้อ Food-Grade และตรวจวัดความเย็นด้วยเครื่องมือดิจิทัล",
              duration: "10 นาที",
              equipment: "เครื่องพ่นละอองฆ่าเชื้อ ULV + เครื่องวัดความเร็วลมดิจิทัล",
              description:
                "ฉีดพ่นน้ำยาฆ่าเชื้อแบคทีเรียและเชื้อราเกรดปลอดภัยสูง เป่าแห้งสนิททุกชิ้นส่วน ประกอบกลับเข้าที่ พร้อมวัดอุณหภูมิลมออกและกระแสไฟก่อนส่งมอบงาน",
              highlight: "ส่งรายงานภาพถ่ายก่อน-หลังล้างและค่าวัดอุณหภูมิเข้า LINE ลูกค้า",
            },
          ],
          pricing: [
            {
              label: "ล้างแอร์คอนโด 1 เครื่อง",
              btuRange: "9,000 – 24,000 BTU (แอร์ติดผนัง)",
              pricePerUnit: "฿650",
              note: "เหมาะสำหรับห้อง Studio หรือ 1 Bedroom",
            },
            {
              label: "แพ็กเกจคอนโด 2 – 3 เครื่อง",
              btuRange: "9,000 – 24,000 BTU (แอร์ติดผนัง)",
              pricePerUnit: "฿550 / เครื่อง",
              originalPrice: "฿650",
              badge: "แพ็กเกจยอดนิยมสำหรับคอนโด",
              note: "ประหยัดทันที ฿200–฿300 เหมาะสำหรับคอนโด 1–2 ห้องนอน",
            },
            {
              label: "แอร์ฝังฝ้า / แอร์ต่อท่อดักท์",
              btuRange: "18,000 – 36,000 BTU (Luxury Condo)",
              pricePerUnit: "฿1,400 / เครื่อง",
              note: "รวมถอดล้างปั๊มเดรนน้ำทิ้งและทำความสะอาดช่องเซอร์วิสฝ้าเพดาน",
            },
          ],
          checklist: [
            "ดูแลเรื่องแลกบัตรและเอกสารขออนุญาตทำงานกับนิติบุคคลครบถ้วน",
            "เทน้ำเสียจากการล้างแอร์ลงท่อห้องน้ำอย่างถูกสุขลักษณะ ไม่เททิ้งระเบียง",
            "ตรวจเช็คแรงดันน้ำยาแอร์ R32 / R410A และกระแสไฟฟรี",
            "รับประกันงานล้าง 30 วัน หากมีน้ำหยดหรือกลิ่นอับ ช่างเข้าแก้ไขฟรี",
          ],
        },
        house: {
          id: "house",
          tabLabel: "House / Villa (บ้านพักอาศัย)",
          tabSub: "บ้านเดี่ยว ทาวน์โฮม และโฮมออฟฟิศหลายเครื่อง",
          headline: "มาตรฐานล้างแอร์บ้านพักอาศัย ล้างครบทั้งคอยล์เย็นและคอยล์ร้อนนอกบ้าน",
          summary:
            "แอร์บ้านเดี่ยวและทาวน์โฮมต้องเจอกับฝุ่นสวน คราบดินโคลน ใบไม้ และจิ้งจกเข้าไปทำรังในคอยล์ร้อน รวมถึงท่อน้ำทิ้งที่ยาวและเกิดตะไคร่น้ำอุดตันได้ง่าย เราจัดทีมช่าง 2 คนเข้าดูแลพร้อมกันเพื่อความรวดเร็ว",
          protectionGuarantee: "ฟื้นฟูทั้งคอยล์เย็นในบ้านและคอยล์ร้อนในสวนให้สะอาดเหมือนใหม่",
          avgDuration: "40–50 นาที / เครื่อง",
          warrantyText: "รับประกันระบบความเย็นและท่อน้ำทิ้ง 30 วันเต็ม",
          steps: [
            {
              stepNumber: "ขั้นตอน 01",
              title: "ตรวจเช็คสุขภาพแอร์ แคปทิเตอร์ และกระแสไฟทุกเครื่อง",
              duration: "10 นาที",
              equipment: "คลิปแอมป์ดิจิทัล + เครื่องวัดอุณหภูมิอินฟราเรด",
              description:
                "ก่อนเริ่มล้าง ช่างเทคนิคจะตรวจวัดค่าแอมป์ของคอมเพรสเซอร์ แคปซิเตอร์ และค่าความต่างอุณหภูมิ (ΔT) ของแอร์ทุกห้อง เพื่อค้นหาความผิดปกติก่อนที่แอร์จะเสียในหน้าร้อน",
              highlight: "ช่วยป้องกันแอร์เสียฉุกเฉินในห้องนอนและห้องนั่งเล่น",
            },
            {
              stepNumber: "ขั้นตอน 02",
              title: "ถอดล้างแยกชิ้นส่วน & อัดฉีดคอยล์เย็นด้วยแรงดัน 150 บาร์",
              duration: "20 นาที",
              equipment: "ปั๊มแรงดันสูงปรับระดับได้ 150 บาร์ + โฟมสลายคราบไขมัน",
              description:
                "ถอดหน้ากาก ถาดน้ำทิ้ง และพัดลมโพรงกระรอกออกมาล้างด้านนอก ฉีดโฟมสลายคราบไขมันจากการทำอาหารและขนสัตว์เลี้ยงในห้องนั่งเล่น ก่อนฉีดน้ำแรงดันสูงชะล้างจนสะอาดลึกถึงแกนกลาง",
              highlight: "ขจัดคราบไอน้ำมันจากห้องครัวและฝุ่นขนสัตว์เลี้ยงได้อย่างหมดจด",
            },
            {
              stepNumber: "ขั้นตอน 03",
              title: "ล้างอัดฉีดคอยล์ร้อนนอกบ้าน & ทะลวงท่อน้ำทิ้ง PVC ยาวถึงรางระบาย",
              duration: "15 นาที",
              equipment: "หัวฉีดล้างคอยล์ร้อน + สายฉีดทะลวงท่อน้ำทิ้ง 15 เมตร",
              description:
                "คอยล์ร้อนนอกบ้านที่โดนแดดฝนและฝุ่นดินจะระบายความร้อนไม่ทัน เราฉีดล้างคราบโคลนและใบไม้ออกจากแผงระบายความร้อน พร้อมอัดน้ำแรงดันสูงทะลวงท่อน้ำทิ้ง PVC ยาวตลอดแนว",
              highlight: "ลดการกินไฟของคอมเพรสเซอร์ลงได้สูงสุดถึง 28%",
            },
            {
              stepNumber: "ขั้นตอน 04",
              title: "พ่นน้ำยาฆ่าเชื้อภูมิแพ้ และวัดแรงดันน้ำยาแอร์ R32/R410A",
              duration: "10 นาที",
              equipment: "เกจวัดแรงดันดิจิทัล + สเปรย์ฆ่าเชื้อโรคและไรฝุ่น",
              description:
                "พ่นน้ำยาฆ่าเชื้อโรคและสารก่อภูมิแพ้ในคอยล์เย็นทุกเครื่อง ตรวจเช็คแรงดันน้ำยาแอร์ที่วาล์วคอยล์ร้อน และส่งมอบใบสรุปสุขภาพแอร์รายเครื่องให้เจ้าของบ้าน",
              highlight: "ได้รับใบรายงานสภาพแอร์ครบทุกห้องในบ้าน",
            },
          ],
          pricing: [
            {
              label: "ล้างแอร์บ้าน 1 – 2 เครื่อง",
              btuRange: "9,000 – 24,000 BTU (แอร์ติดผนัง)",
              pricePerUnit: "฿600 / เครื่อง",
              note: "รวมล้างคอยล์เย็นในบ้านและคอยล์ร้อนนอกบ้านครบชุด",
            },
            {
              label: "แพ็กเกจสุดคุ้ม 3 – 5 เครื่อง",
              btuRange: "9,000 – 30,000 BTU (เหมาล้างทั้งบ้าน)",
              pricePerUnit: "฿500 / เครื่อง",
              originalPrice: "฿650",
              badge: "แพ็กเกจครอบครัวสุดคุ้ม",
              note: "ประหยัดสูงสุด ฿750 เหมาะสำหรับบ้านเดี่ยวและทาวน์โฮม 3 ห้องนอน",
            },
            {
              label: "แอร์แขวน / แอร์สี่ทิศทาง (4-Way)",
              btuRange: "24,000 – 48,000 BTU (ห้องโถงใหญ่ / ออฟฟิศ)",
              pricePerUnit: "฿1,500 / เครื่อง",
              note: "ถอดล้างหน้ากาก ลูกลอยปั๊มน้ำทิ้ง และใบพัดเทอร์โบครบชุด",
            },
          ],
          checklist: [
            "จัดทีมช่าง 2 คนเข้าปฏิบัติงาน เสร็จไว ไม่รบกวนเวลาพักผ่อน",
            "มีบันไดสูงและอุปกรณ์เซฟตี้สำหรับคอยล์ร้อนที่แขวนสูงนอกตัวบ้าน",
            "ฟรี! น้ำยาสลายคราบไขมันสำหรับแอร์ห้องโถงใกล้ห้องครัว",
            "รับประกันงานล้างแอร์ทุกเครื่องในบ้านนาน 30 วันเต็ม",
          ],
        },
      },
    },
    serviceArea: {
      heading: "ทีมช่างประจำจุดทั่วกรุงเทพฯ และปริมณฑล พร้อมเข้าบริการไว",
      description:
        "รถบริการเคลื่อนที่ของเราประจำการใกล้แนวรถไฟฟ้า BTS/MRT และถนนวงแหวนรอบนอก ฟรีค่าเดินทางใน 6 โซนหลักทั่วกรุงเทพฯ นนทบุรี สมุทรปราการ และปทุมธานี",
      filterLabel: "คลิกเลือกโซนพื้นที่ของคุณเพื่อคำนวณราคาและจองคิว:",
      dispatchLabel: "เวลาเดินทางเฉลี่ย",
      activeTeamsLabel: "ทีมช่างประจำโซน",
      bookInZoneCta: "เปิดหน้าต่างคำนวณราคาและจองคิว",
      noSurchargeNote: "ฟรีค่าเดินทางในเขตกรุงเทพฯ นนทบุรี สมุทรปราการ และปทุมธานี",
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
      copyright: "© 2026 บริษัท แอร์คอน เซอร์วิส โปร จำกัด สงวนลิขสิทธิ์",
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

