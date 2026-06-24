import { Course, Testimonial } from "./types";

export const COURSES: Course[] = [
  {
    id: "tajweed",
    title: "Tajweed",
    subTitle: "Barashada Tajwiidka",
    description: "Baro sida loo aqriyo Qur'aanka kariimka ah si waafaqsan qawaacidda Tajwiidka.",
    rating: 4.9,
    reviewCount: 120,
    price: "$25/Month",
    icon: "BookOpen",
    levelDetails: [
      {
        level: "Bilaabo (Beginner)",
        topics: [
          "Xarfaha Higaada (Alif, Ba, Ta) iyo dhawaaqooda",
          "Dhaqdhaqaaqyada aasaasiga ah (Fatha, Kasra, Dhamma)",
          "Sukuunka iyo Shaddada"
        ]
      },
      {
        level: "Dhexe (Intermediate)",
        topics: [
          "Xeerarka Nuun-ka iyo Miim-ka reeban (Ikhfa, Idgham, Izhar, Iqlab)",
          "Maddada (Jiidista codka) iyo noocyadeeda kala duwan",
          "Halkay ka soo baxaan xarfaha (Makharij al-Huroof)"
        ]
      },
      {
        level: "Sare (Advanced)",
        topics: [
          "Calaamadaha joogsiga ee Qur'aanka (Waqf iyo Ibtida)",
          "Dhawaaqyada gaarka ah iyo sifooyinka xarfaha",
          "Cod-farsameynta iyo akhrinta rasmiga ah ee hufan"
        ]
      }
    ]
  },
  {
    id: "arabic",
    title: "Arabic",
    subTitle: "Luqadda Carabiga",
    description: "Baro luqadda Carabiga si aad u fahanto micnaha Qur'aanka iyo Sunnaha.",
    rating: 4.8,
    reviewCount: 85,
    price: "$30/Month",
    icon: "Languages",
    levelDetails: [
      {
        level: "Bilaabo (Beginner)",
        topics: [
          "Erayada maalin laha ah iyo isbarashada",
          "Dhisidda jumladaha fudud",
          "Magacyada iyo magac-u-yaalka Carabiga"
        ]
      },
      {
        level: "Dhexe (Intermediate)",
        topics: [
          "Naxwaha aasaasiga ah (Al-Ajurrumiyyah)",
          "Sarfiga (Isbeddelka erayada iyo falka)",
          "Wada-hadal kooban iyo fahamka qoraallada fudud"
        ]
      },
      {
        level: "Sare (Advanced)",
        topics: [
          "Falanqaynta Suugaanta iyo naxwaha sare",
          "Fahamka ereyada qotada dheer ee Qur'aanka iyo Axaadiista",
          "Qorista maqaallada iyo doodaha rasmiga ah"
        ]
      }
    ]
  },
  {
    id: "fiqh",
    title: "Fiqh",
    subTitle: "Culuumta Fiqiga",
    description: "Baro qawaacidda nolosha iyo cibaadada si waafaqsan shareecada Islaamka.",
    rating: 5.0,
    reviewCount: 92,
    price: "$20/Month",
    icon: "Scale",
    levelDetails: [
      {
        level: "Fiqh al-Ibadah (Cibaadada)",
        topics: [
          "Xeerarka Daahirnimada (Weyso, Qubeys, Tayamum)",
          "Tiirarka Salaadda, shuruudaheeda iyo sunnaheeda",
          "Fiqiga Soonka (Bisha Ramadaan) iyo Zakada"
        ]
      },
      {
        level: "Fiqh al-Muamalat (Xiriirka bulshada)",
        topics: [
          "Fiqiga Guurka iyo qoyska Islaamka",
          "Ganacsiga xalaasha ah iyo waxyaabaha laga reebay",
          "Xuquuqda deriska iyo dadka la nool"
        ]
      },
      {
        level: "Sare (Fiqh & Usuul al-Fiqh)",
        topics: [
          "Aasaaska Usuul al-Fiqh (Sidee xukunnada loo soo saaraa)",
          "Dersidda madhabta Shaaficiyada",
          "Arrimaha casriga ah ee u baahan fatwooyinka gaarka ah"
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
    name: "Sheekh Cabdiraxmaan Al-Xafid",
    role: "Macalinka Sare ee Tajwiidka iyo Qiraa'aatka",
    specialty: "Tajweed & Memorization",
    experience: "12 Sanno",
    education: "Jaamacadda Al-Azhar, Kuliyadda Qiraa'aatka",
    rating: 4.9,
    reviews: 140,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: "teacher-2",
    name: "Ustaad Axmed Nuur",
    role: "Macalinka Luqadda Carabiga iyo Naxwaha",
    specialty: "Arabic & Sarfi",
    experience: "8 Sanno",
    education: "Jaamacadda Islaamiga ee Madiina, Luqadaha",
    rating: 4.8,
    reviews: 98,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: "teacher-3",
    name: "Ustaadah Maaryama Maxamed",
    role: "Macallimad Fiqiga iyo Tarbiyada Qoyska",
    specialty: "Fiqh & Islamic Studies",
    experience: "10 Sanno",
    education: "Jaamacadda Umm Al-Qura, Shareecada Islaamka",
    rating: 5.0,
    reviews: 112,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop"
  }
];
