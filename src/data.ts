import { Course, Testimonial } from "./types";

import higaadaImg from "./assets/images/higaada_nourania_1782639159838.jpg";
import quranLaptopImg from "./assets/images/quran_on_laptop_1782639173457.jpg";
import arabicTvImg from "./assets/images/arabic_tv_class_1782639185358.jpg";
import islamicStudiesImg from "./assets/images/islamic_studies_desk_1782639197766.jpg";

import sheikhImg from "./assets/images/sheikh_teaching_adults_1782636711922.jpg";
import ustadAhmedImg from "./assets/images/ustad_ahmed_teaching_arabic_1782636739073.jpg";
import ustaadaMaryamaImg from "./assets/images/ustaada_maryama_library_1782636726802.jpg";

// New high-quality course images generated for specific topics
import fiqhImg from "./assets/images/islamic_fiqh_practice_1782928748784.jpg";
import aqeedahImg from "./assets/images/islamic_aqeedah_tawheed_1782928759531.jpg";
import somaliImg from "./assets/images/learn_somali_textbook_1782928771364.jpg";

export const COURSES: Course[] = [
  {
    id: "higaada",
    title: "Barashada Higaada (Qaacida Nourania) - 3 Months Only",
    subTitle: "Higaada iyo Ku Dhawaaqista Saxda Ah",
    description: "Ku baro 3 bilood gudahood higaada iyo ku dhawaaqista saxda ah ee xarfaha Carabiga adigoo isticmaalaya buugga caanka ah ee Qaacida Nuuraaniya.",
    rating: 4.9,
    reviewCount: 120,
    price: "$20/Month",
    icon: "BookOpen",
    image: higaadaImg,
    levelDetails: [
      {
        level: "Bilaabo (Beginner)",
        topics: [
          "Xarfaha Higaada (Alif, Ba, Ta) iyo dhawaaqooda saxda ah",
          "Dhaqdhaqaaqyada aasaasiga ah (Fatha, Kasra, Dhamma)",
          "Sukuunka, Shaddada iyo isku xirka xarfaha"
        ]
      }
    ]
  },
  {
    id: "quran-memorization",
    title: "Barashada Quranka (Bilow ilaa Xifdi)",
    subTitle: "Xifdinta iyo Akhrinta Qur'aanka",
    description: "Baro akhrinta saxda ah iyo xifdinta Qur'aanka Kariimka ah laga bilaabo eber ilaa heer aad ka noqoto Xaafid, adigoo raacaya manhaj habaysan.",
    rating: 5.0,
    reviewCount: 215,
    price: "$30/Month",
    icon: "Award",
    image: quranLaptopImg,
    levelDetails: [
      {
        level: "Akhrinta & Qawaacidda",
        topics: [
          "Akhrinta Mus-hafka si toos ah",
          "Xeerarka Tajwiidka ee aasaasiga ah",
          "Dhaqancelinta codka iyo ku dhawaaqista saxda ah"
        ]
      },
      {
        level: "Xifdinta (Hifdh)",
        topics: [
          "Xifdinta Juz 30aad & 29aad",
          "Dhisidda qorshe maalinle ah oo dib-u-eegis (Murajaca) leh",
          "Dhammaystirka Xifdiga Qur'aanka Kariimka ah oo dhan"
        ]
      }
    ]
  },
  {
    id: "arabic-6m",
    title: "Barashada Luuqada Carabiga - 6 Months",
    subTitle: "Fahamka Luqadda iyo Naxwaha",
    description: "Baro luqadda Carabiga, naxwaheeda, hadalkeeda iyo qoraalkeeda muddo 6 bilood ah si aad u fahanto micnaha Qur'aanka iyo Axaadiista.",
    rating: 4.8,
    reviewCount: 98,
    price: "$25/Month",
    icon: "Languages",
    image: arabicTvImg,
    levelDetails: [
      {
        level: "Luuqada & Wada-hadalka",
        topics: [
          "Erayada maalinlaha ah iyo wadahadalka aasaasiga ah",
          "Dhisidda jumladaha iyo fahamka maqal iyo muuqaalba",
          "Naxwaha iyo Sarfiga (Al-Ajurrumiyyah)"
        ]
      }
    ]
  },
  {
    id: "fiqh",
    title: "Barashada Fiqiga",
    subTitle: "Axkaamta iyo Shareecada Islaamka",
    description: "Baro axkaamta cibaadada, daahirnimada, salaadda, soonka, guurka, iyo nolosha maalinlaha ah ee qofka Muslimka ah.",
    rating: 4.9,
    reviewCount: 110,
    price: "$20/Month",
    icon: "Scale",
    image: fiqhImg,
    levelDetails: [
      {
        level: "Fiqiga Cibaadada (Fiqh al-Ibadah)",
        topics: [
          "Xeerarka Daahirnimada (Weyso, Qubays, Tayamum)",
          "Tiirarka iyo shuruudaha Salaadda",
          "Fiqiga Soonka, Sakada iyo Xajka"
        ]
      }
    ]
  },
  {
    id: "hadith",
    title: "Barashada Axaadiista Rasuulka (scw)",
    subTitle: "Sunnaha iyo Anshaxa Islaamka",
    description: "Baro hadalladii, ficilladii iyo anshaxii Nebi Muxamed (Naxariis iyo nabadgelyo kor u ahaatee) si aad u fahamto dhaqanka suuban.",
    rating: 5.0,
    reviewCount: 85,
    price: "$18/Month",
    icon: "BookOpen",
    image: islamicStudiesImg,
    levelDetails: [
      {
        level: "Hadith Studies",
        topics: [
          "Dersidda Arbaciinka Al-Nawawi (40ka Xadiis)",
          "Fahamka anshaxa iyo akhlaaqda Nebiga (scw)",
          "Xadiis barashada maalinlaha ah ee qoyska"
        ]
      }
    ]
  },
  {
    id: "caqiidada-barashada",
    title: "Barashada Caqiidada",
    subTitle: "Tiirarka Iimaanka iyo Tawxiidka",
    description: "Baro tiirarka iimaanka ee saxda ah iyo dhisidda caqiidada Islaamiga ah ee ku salaysan Kitaabka iyo Sunnaha.",
    rating: 4.9,
    reviewCount: 92,
    price: "$20/Month",
    icon: "ShieldCheck",
    image: aqeedahImg,
    levelDetails: [
      {
        level: "Tawxiidka & Iimaanka",
        topics: [
          "Barashada Tiirarka Iimaanka",
          "Noocyada Tawxiidka (Rububiyyah, Uluhiyyah, Asma wa Sifat)",
          "Badbaadinta caqiidada iyo fahamka saxda ah"
        ]
      }
    ]
  },
  {
    id: "tafseer",
    title: "Tafsiirka Quranka",
    subTitle: "Fahamka iyo Macnaha Qur'aanka",
    description: "Faham micnaha guud iyo midka qotada dheer ee aayadaha Qur'aanka Kariimka ah iyo sababihii loo soo dejiyay.",
    rating: 5.0,
    reviewCount: 104,
    price: "$25/Month",
    icon: "BookOpen",
    image: islamicStudiesImg,
    levelDetails: [
      {
        level: "Tafsiirka aasaasiga ah",
        topics: [
          "Tafsiirka Juz Amma iyo Suradaha badanaa la akhriyo",
          "Fahamka ujeeddooyinka guud ee Qur'aanka",
          "Barashada sababaha soo degidda aayadaha (Asbab al-Nuzul)"
        ]
      }
    ]
  },
  {
    id: "caqiidada",
    title: "Caqiidada",
    subTitle: "Dhisidda Garaadka iyo Caqiidada",
    description: "Barasho qoto-dheer oo ku saabsan aasaaska diinta Islaamka iyo fahamka caqiidada saxda ah ee badbaadada leh.",
    rating: 4.9,
    reviewCount: 78,
    price: "$20/Month",
    icon: "ShieldCheck",
    image: aqeedahImg,
    levelDetails: [
      {
        level: "Caqiidada Islaamka",
        topics: [
          "Dersidda kutubta caqiidada ee caanka ah",
          "Waa maxay waxyaabaha buriya Islaamnimada iyo Iimaanka",
          "Tawxiidka iyo saamaynta uu ku leeyahay nolosha qofka"
        ]
      }
    ]
  },
  {
    id: "somali",
    title: "Iyo Luuqada Somaliga",
    subTitle: "Qorista, Akhriska iyo Suugaanta",
    description: "Baro qorista saxda ah, higaada, naxwaha iyo hal-abuurka luqadda hodanka ah ee Soomaaliga.",
    rating: 4.8,
    reviewCount: 72,
    price: "$15/Month",
    icon: "Languages",
    image: somaliImg,
    levelDetails: [
      {
        level: "Somaliga Aasaasiga ah",
        topics: [
          "Higaada iyo qawaacidda qorista Af-Soomaaliga",
          "Akhrinta iyo falanqaynta qoraallada Soomaaliga",
          "Naxwaha iyo adeegsiga ereyada hodanka ah"
        ]
      }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    quote: "Baro Quran Academy wuxuu ii sahlay inaan Qur'aanka barto anigoo shaqadayda ku jira. Macalimiintu waa kuwo aad u Samir badan.",
    author: "Axmed Maxamed",
    course: "Ardayda Tajwiidka",
    avatarLetter: "A"
  },
  {
    id: "test-2",
    quote: "Manhajka luqadda Carabiga ee ay bixiyaan waa mid aad u fudud oo qof kasta oo bilaaba ah uu fahmi karo. Aad ayaan ugu qanacsanahay.",
    author: "Hani Cabdi",
    course: "Ardayda Carabiga",
    avatarLetter: "H"
  },
  {
    id: "test-3",
    quote: "Waqtiyada oo dabacsan iyo macalimiinta oo khibrad leh ayaa ka dhigay barashada diinta mid aad u xiiso badan.",
    author: "Cumar Cali",
    course: "Ardayda Fiqiga",
    avatarLetter: "C"
  }
];

export const TEACHERS = [
  {
    id: "teacher-1",
    name: "Sheekh Cabdiraxmaan Cali",
    role: "Macalinka Sare ee Tajwiidka iyo Qiraa'aatka",
    specialty: "Tajweed & Memorization",
    experience: "12 Sanno",
    education: "Leh khibrad barista oo dhan 12 sano oo wax-barid ah.",
    rating: 4.9,
    reviews: 140,
    avatar: sheikhImg
  },
  {
    id: "teacher-2",
    name: "Ustaad Axmed Nuur",
    role: "Macalinka Luqadda Carabiga iyo Naxwaha",
    specialty: "Arabic & Sarfi",
    experience: "8 Sanno",
    education: "Leh khibrad waxbaris oo dhan 8 sano oo dhanka Carabiga ah.",
    rating: 4.8,
    reviews: 98,
    avatar: ustadAhmedImg
  },
  {
    id: "teacher-3",
    name: "Ustaada Maryama",
    role: "Macallimad Fiqiga iyo Tarbiyada Qoyska",
    specialty: "Fiqh & Islamic Studies",
    experience: "10 Sanno",
    education: "Leh khibrad durugsan oo dhan 10 sano oo dhanka Fiqiga ah.",
    rating: 5.0,
    reviews: 112,
    avatar: ustaadaMaryamaImg
  }
];
