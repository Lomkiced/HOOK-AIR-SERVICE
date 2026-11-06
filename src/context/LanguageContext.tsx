"use client";

import React, { createContext, useContext, useSyncExternalStore, useEffect, useCallback } from "react";
import type { BrandId } from "@/lib/brands";

export type Language = "en" | "th";

export interface StoryBeat {
  title: string;
  sub: string;
}

export interface LayerLabel {
  name: string;
  spec: string;
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
    brandTagline: string;
    brands: string;
    comparison: string;
    propertyTypes: string;
    bookCleaning: string;
    staffPortal: string;
    langSwitchLabel: string;
  };
  story: {
    beats: StoryBeat[];
    scrollHint: string;
    scrubLabel: string;
    assembled: string;
    exploded: string;
    layers: LayerLabel[];
  };
  brands: {
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
    heading: string;
    sub: string;
    instruction: string;
    ariaLabel: string;
    before: { label: string; temp: string; blockage: string; energy: string };
    after: { label: string; temp: string; blockage: string; energy: string };
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
  closing: {
    title: string;
    sub: string;
    cta: string;
    line: string;
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
      brandTagline: "Bangkok aircon hygiene",
      brands: "Brands",
      comparison: "Before & After",
      propertyTypes: "Condo vs. House",
      bookCleaning: "Book Now",
      staffPortal: "Staff Portal",
      langSwitchLabel: "Switch language between English and Thai",
    },
    story: {
      beats: [
        { title: "Pure.", sub: "Engineered aircon hygiene." },
        { title: "Unveiled.", sub: "Every layer exposed." },
        { title: "Sanitized.", sub: "150 PSI deep coil & blower flush." },
        { title: "Mastered.", sub: "13 global brands. One standard." },
      ],
      scrollHint: "Scroll or drag to take it apart",
      scrubLabel: "Explode and reassemble the air conditioner",
      assembled: "Assembled",
      exploded: "Exploded",
      layers: [
        { name: "Aerodynamic fascia", spec: "Smart LED display · 18°C" },
        { name: "Honeycomb pre-filters", spec: "Dual high-density mesh" },
        { name: "Evaporator coil", spec: "Copper tube · blue aluminium fins" },
        { name: "Cross-flow blower", spec: "Squirrel-cage barrel" },
        { name: "Chassis & drain pan", spec: "Louver swing assembly" },
      ],
    },
    brands: {
      heading: "Every brand.",
      sub: "One certified standard, tuned to each manufacturer's engineering.",
      dockLabel: "Choose your air conditioner brand",
      techLabel: "Signature engineering",
      methodLabel: "How we clean it",
      pressureLabel: "Coil wash pressure",
      timeLabel: "Service time",
      minutes: "min",
      preview: "Preview in 3D exploded rig",
      profiles: {
        daikin: {
          tech: "Coanda airflow & Streamer purifier",
          method: "Coanda louver and Streamer unit come off first, then a fin-safe coil flush.",
        },
        mitsubishi: {
          tech: "Dual Barrier Coating",
          method: "pH-neutral foam only, so the anti-dust, anti-oil coating survives every wash.",
        },
        carrier: {
          tech: "Self-clean coil cycle & ionizer",
          method: "Ionizer sealed, then a full coil and drain-pan flush to clear what self-clean leaves behind.",
        },
        haier: {
          tech: "Frost self-clean & 56°C sterilization",
          method: "Thermal sensor guarded; we flush out the frost-loosened grime the cycle can't drain.",
        },
        amena: {
          tech: "Heavy-duty Thai residential coil",
          method: "Full-pressure coil flush tuned for Bangkok dust and long condo drain runs.",
        },
        samsung: {
          tech: "WindFree 23,000 micro-holes",
          method: "Ultrasonic clearing of the micro-hole panel, then a blower and coil deep wash.",
        },
        toshiba: {
          tech: "Magic Coil coating & Ultra Pure filter",
          method: "Coating-safe rinse and filter rebuild, never abrasive brushing.",
        },
        tcl: {
          tech: "Hydrophilic blue-fin coil",
          method: "Straight-line nozzle passes keep the hydrophilic layer intact while lifting grime.",
        },
        sharp: {
          tech: "Plasmacluster ion generator",
          method: "Ion generator removed and dry-cleaned; coil and blower flushed separately.",
        },
        midea: {
          tech: "Active Clean high-temperature cycle",
          method: "Sensor wiring isolated, then a full evaporator and squirrel-cage flush.",
        },
        fujitsu: {
          tech: "Large-diameter fan & apple-catechin filter",
          method: "The oversized blower barrel is washed outside the unit; filters refreshed.",
        },
        lg: {
          tech: "DUAL Inverter & Gold Fin coil",
          method: "Coated fins rinsed at low pressure, then compressor amps checked after.",
        },
        panasonic: {
          tech: "nanoe X generator",
          method: "nanoe X module shielded while coil, drain pan and blower get a full flush.",
        },
      },
    },
    slider: {
      heading: "Difference.",
      sub: "Six months of Bangkok air, against one visit.",
      instruction: "Drag to compare",
      ariaLabel: "Before and after coil cleaning comparison",
      before: { label: "Before", temp: "19.8°C", blockage: "78%", energy: "+34%" },
      after: { label: "After", temp: "10.5°C", blockage: "0%", energy: "Factory" },
      tempLabel: "Vent temperature",
      blockageLabel: "Fin blockage",
      energyLabel: "Energy draw",
    },
    explorer: {
      heading: "Condo. House.",
      sub: "Two kinds of home. Two protocols.",
      from: "From",
      perUnit: "/ unit",
      book: "Book this protocol",
      profiles: {
        condo: {
          tab: "Condo",
          line: "Juristic paperwork, quiet pump, dry floors.",
          price: "฿550",
          duration: "45–60 min per unit",
          units: "2+ units",
          steps: [
            { title: "Sealed in.", line: "Floor mats, PCB dry-bag, closed waste-water tank." },
            { title: "Blower out.", line: "Squirrel-cage and drain tray washed outside the unit." },
            { title: "Balcony shielded.", line: "Condenser wrapped. Zero overspray on neighbours." },
            { title: "Verified.", line: "Vent temperature and amps sent to your LINE." },
          ],
        },
        house: {
          tab: "House",
          line: "Two-technician crew. Up to 8 units in one visit.",
          price: "฿500",
          duration: "40–50 min per unit",
          units: "3+ units",
          steps: [
            { title: "Health check.", line: "Capacitor, amps and ΔT on every unit." },
            { title: "Deep wash.", line: "150 PSI coil flush with grease-lifting foam." },
            { title: "Outdoor revived.", line: "Condenser descaled, drain line jetted to the gutter." },
            { title: "Sanitized.", line: "Anti-allergen mist and refrigerant pressure check." },
          ],
        },
      },
    },
    closing: {
      title: "Breathe.",
      sub: "Book in 30 seconds. Pay after the job is done.",
      cta: "Book Cleaning",
      line: "Chat on LINE",
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
      copyright: "© 2026 Hook Air Service Co., Ltd. All rights reserved.",
    },
  },
  th: {
    nav: {
      brandName: "HOOK AIR SERVICE",
      brandTagline: "ล้างแอร์ฆ่าเชื้อ กรุงเทพฯ",
      brands: "แบรนด์",
      comparison: "ก่อน-หลังล้าง",
      propertyTypes: "คอนโด vs บ้าน",
      bookCleaning: "จองคิว",
      staffPortal: "ระบบพนักงาน",
      langSwitchLabel: "สลับภาษาระหว่างภาษาอังกฤษและภาษาไทย",
    },
    story: {
      beats: [
        { title: "บริสุทธิ์", sub: "นวัตกรรมการล้างแอร์ระดับพรีเมียม" },
        { title: "ถอดทุกชิ้นส่วน", sub: "เปิดเผยทุกจุดซ่อนเร้น" },
        { title: "สะอาดลึกถึงแกน", sub: "ฉีดล้างคอยล์และโพรงกระรอกด้วยแรงดันสูง" },
        { title: "เชี่ยวชาญทุกแบรนด์", sub: "รองรับ 13 แบรนด์ชั้นนำ มาตรฐานเดียวที่เหนือกว่า" },
      ],
      scrollHint: "เลื่อนหน้าจอหรือลากแถบเพื่อถอดชิ้นส่วน",
      scrubLabel: "ถอดและประกอบชิ้นส่วนเครื่องปรับอากาศ",
      assembled: "ประกอบ",
      exploded: "ถอดชิ้นส่วน",
      layers: [
        { name: "หน้ากากแอร์", spec: "จอ LED อัจฉริยะ · 18°C" },
        { name: "แผ่นกรองรังผึ้ง", spec: "ตาข่ายความละเอียดสูง 2 แผ่น" },
        { name: "คอยล์เย็น", spec: "ท่อทองแดง · ครีบอะลูมิเนียม" },
        { name: "พัดลมโพรงกระรอก", spec: "ใบพัดแบบ Cross-flow" },
        { name: "โครงเครื่องและถาดน้ำทิ้ง", spec: "ชุดบานสวิงปรับทิศทางลม" },
      ],
    },
    brands: {
      heading: "ทุกแบรนด์",
      sub: "มาตรฐานเดียว ปรับให้เข้ากับวิศวกรรมของแต่ละผู้ผลิต",
      dockLabel: "เลือกแบรนด์แอร์ของคุณ",
      techLabel: "เทคโนโลยีเด่น",
      methodLabel: "วิธีที่เราล้าง",
      pressureLabel: "แรงดันฉีดล้างคอยล์",
      timeLabel: "เวลาให้บริการ",
      minutes: "นาที",
      preview: "ดูแบบถอดชิ้นส่วน 3 มิติ",
      profiles: {
        daikin: {
          tech: "ลมโคอันดะ และระบบฟอกอากาศ Streamer",
          method: "ถอดบานสวิงโคอันดะและชุด Streamer ออกก่อน แล้วฉีดล้างคอยล์แบบถนอมครีบ",
        },
        mitsubishi: {
          tech: "สารเคลือบ Dual Barrier Coating",
          method: "ใช้โฟม pH เป็นกลางเท่านั้น สารเคลือบกันฝุ่นและคราบมันจึงไม่หลุดลอก",
        },
        carrier: {
          tech: "ระบบล้างคอยล์อัตโนมัติ และไอออนไนเซอร์",
          method: "ปิดผนึกชุดไอออนไนเซอร์ แล้วล้างคอยล์และถาดน้ำทิ้งส่วนที่ระบบอัตโนมัติล้างไม่ถึง",
        },
        haier: {
          tech: "ล้างด้วยน้ำแข็ง และฆ่าเชื้อ 56°C",
          method: "ป้องกันเซ็นเซอร์อุณหภูมิ แล้วชะล้างคราบที่หลุดจากรอบน้ำแข็งออกให้หมด",
        },
        amena: {
          tech: "คอยล์แบบงานหนักสำหรับบ้านเมืองไทย",
          method: "ฉีดล้างคอยล์แรงดันเต็มกำลัง เหมาะกับฝุ่นกรุงเทพฯ และท่อน้ำทิ้งยาวในคอนโด",
        },
        samsung: {
          tech: "WindFree รูระบายลม 23,000 รู",
          method: "เคลียร์รูระบายลมด้วยคลื่นอัลตราโซนิก แล้วล้างพัดลมและคอยล์อย่างละเอียด",
        },
        toshiba: {
          tech: "สารเคลือบ Magic Coil และแผ่นกรอง Ultra Pure",
          method: "ล้างแบบถนอมสารเคลือบ และฟื้นฟูแผ่นกรอง ไม่ใช้แปรงขัด",
        },
        tcl: {
          tech: "คอยล์ครีบฟ้าเคลือบสาร Hydrophilic",
          method: "ฉีดหัวฉีดตามแนวตรง รักษาชั้นเคลือบไว้ขณะชะคราบสกปรกออก",
        },
        sharp: {
          tech: "เครื่องกำเนิดไอออน Plasmacluster",
          method: "ถอดชุดกำเนิดไอออนออกทำความสะอาดแบบแห้ง แยกล้างคอยล์และพัดลม",
        },
        midea: {
          tech: "ระบบ Active Clean ล้างด้วยความร้อน",
          method: "แยกสายเซ็นเซอร์ออกก่อน แล้วล้างคอยล์เย็นและโพรงกระรอกเต็มชุด",
        },
        fujitsu: {
          tech: "พัดลมขนาดใหญ่ และแผ่นกรอง Apple-catechin",
          method: "ถอดโพรงกระรอกขนาดใหญ่ออกมาล้างนอกเครื่อง พร้อมฟื้นฟูแผ่นกรอง",
        },
        lg: {
          tech: "DUAL Inverter และคอยล์ Gold Fin",
          method: "ล้างครีบเคลือบด้วยแรงดันต่ำ แล้ววัดกระแสคอมเพรสเซอร์หลังล้าง",
        },
        panasonic: {
          tech: "ระบบ nanoe X",
          method: "ปกป้องโมดูล nanoe X ขณะล้างคอยล์ ถาดน้ำทิ้ง และพัดลมเต็มชุด",
        },
      },
    },
    slider: {
      heading: "เห็นความต่าง",
      sub: "ฝุ่นกรุงเทพฯ 6 เดือน เทียบกับการล้างเพียงครั้งเดียว",
      instruction: "ลากเพื่อเปรียบเทียบ",
      ariaLabel: "เปรียบเทียบคอยล์แอร์ก่อนและหลังล้าง",
      before: { label: "ก่อนล้าง", temp: "19.8°C", blockage: "78%", energy: "+34%" },
      after: { label: "หลังล้าง", temp: "10.5°C", blockage: "0%", energy: "ตามสเปก" },
      tempLabel: "อุณหภูมิลมออก",
      blockageLabel: "ครีบอุดตัน",
      energyLabel: "การกินไฟ",
    },
    explorer: {
      heading: "คอนโด. บ้าน.",
      sub: "ที่พักต่างกัน ขั้นตอนต่างกัน",
      from: "เริ่มต้น",
      perUnit: "/ เครื่อง",
      book: "จองขั้นตอนนี้",
      profiles: {
        condo: {
          tab: "คอนโด",
          line: "ประสานนิติฯ ปั๊มเสียงเงียบ พื้นแห้งสนิท",
          price: "฿550",
          duration: "45–60 นาที ต่อเครื่อง",
          units: "2 เครื่องขึ้นไป",
          steps: [
            { title: "ปิดคลุมมิดชิด", line: "ปูแผ่นรองพื้น หุ้มแผงวงจร ต่อถังน้ำเสียระบบปิด" },
            { title: "ถอดโพรงกระรอก", line: "ถอดโพรงกระรอกและถาดน้ำทิ้งออกมาล้างนอกเครื่อง" },
            { title: "กั้นระเบียง", line: "ครอบคอยล์ร้อน ไม่มีน้ำกระเด็นใส่ห้องข้างเคียง" },
            { title: "ตรวจวัดผล", line: "วัดอุณหภูมิลมและกระแสไฟ ส่งรายงานเข้า LINE" },
          ],
        },
        house: {
          tab: "บ้าน",
          line: "ทีมช่าง 2 คน ล้างได้ถึง 8 เครื่องในครั้งเดียว",
          price: "฿500",
          duration: "40–50 นาที ต่อเครื่อง",
          units: "3 เครื่องขึ้นไป",
          steps: [
            { title: "ตรวจสุขภาพ", line: "วัดแคปซิเตอร์ กระแสไฟ และ ΔT ทุกเครื่อง" },
            { title: "ล้างลึก", line: "ฉีดล้างคอยล์ 150 PSI พร้อมโฟมสลายคราบมัน" },
            { title: "ฟื้นคอยล์ร้อน", line: "ล้างคอยล์ร้อนนอกบ้าน ทะลวงท่อน้ำทิ้งถึงรางระบาย" },
            { title: "ฆ่าเชื้อ", line: "พ่นน้ำยาฆ่าเชื้อ ตรวจแรงดันน้ำยาแอร์" },
          ],
        },
      },
    },
    closing: {
      title: "หายใจเต็มปอด",
      sub: "จองใน 30 วินาที ชำระเงินหลังล้างเสร็จ",
      cta: "จองคิวล้างแอร์",
      line: "แชทผ่าน LINE",
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
      copyright: "© 2026 บริษัท ฮุค แอร์ เซอร์วิส จำกัด สงวนลิขสิทธิ์",
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
