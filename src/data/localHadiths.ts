import { HadithBook, HadithContent } from '../types/hadith';

export const BOOKS_METADATA: HadithBook[] = [
  { name: 'HR. Abu Daud', id: 'abu-daud', available: 4419 },
  { name: 'HR. Ahmad', id: 'ahmad', available: 26363 },
  { name: 'HR. Bukhari', id: 'bukhari', available: 7008 },
  { name: 'HR. Darimi', id: 'darimi', available: 3367 },
  { name: 'HR. Ibnu Majah', id: 'ibnu-majah', available: 4285 },
  { name: 'HR. Malik', id: 'malik', available: 1587 },
  { name: 'HR. Muslim', id: 'muslim', available: 4930 },
  { name: 'HR. Nasai', id: 'nasai', available: 5361 },
  { name: 'HR. Tirmidzi', id: 'tirmidzi', available: 3625 },
];

export const LOCAL_HADITHS_DATABASE: Record<string, HadithContent[]> = {
  bukhari: [
    {
      number: 1,
      arab: "حَدَّثَنَا حُمَيْدُ بْنُ مَسْعَدَةَ حَدَّثَنَا بِشْرُ بْنُ الْمُفَضَّلِ حَدَّثَنَا يَحْيَى بْنُ سَعِيدٍ عَنْ مُحَمَّدِ بْنِ إِبْرَاهِيمَ التَّيْمِيِّ عَنْ عَلْقَمَةَ بْنِ وَقَّاصٍ اللَّيْثِيِّ قَالَ سَمِعْتُ عُمَرَ بْنَ الْخَطَّابِ رَضِيَ اللَّهُ عَنْهُ عَلَى الْمِنْبَرِ قَالَ سَمِعْتُ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ يَقُولُ إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا أَوْ إِلَى امْرَأَةٍ يَنْكِحُهَا فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ.",
      id: "Telah menceritakan kepada kami Humaid bin Mas'adah, menceritakan kepada kami Bishr bin Al-Mufaddal, menceritakan kepada kami Yahya bin Sa'id dari Muhammad bin Ibrahim At-Taimi dari Alqamah bin Waqqas Al-Laithi berkata: Saya mendengar Umar bin Al-Khattab radhiyallahu 'anhu di atas mimbar berkata: Saya mendengar Rasulullah shallallahu 'alaihi wa sallam bersabda: 'Sesungguhnya setiap amalan tergantung pada niatnya, dan setiap orang akan mendapatkan sesuai dengan apa yang ia niatkan. Barangsiapa yang hijrahnya karena dunia yang ingin diperolehnya atau karena wanita yang ingin dinikahinya, maka hijrahnya sesuai dengan apa yang ia tuju.'"
    },
    {
      number: 2,
      arab: "حَدَّثَنَا عَبْدُ اللَّهِ بْنُ يُوسُفَ قَالَ أَخْبَرَنَا مَالِكٌ عَنْ هِشَامِ بْنِ عُرْوَةَ عَنْ أَبِيهِ عَنْ عَائِشَةَ أُمِّ الْمُؤْمِنِينَ رَضِيَ اللَّهُ عَنْهَا أَنَّ حَارِثَ بْنَ هِشَامٍ رَضِيَ اللَّهُ عَنْهُ سَأَلَ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ فَقَالَ يَا رَسُولَ اللَّهِ كَيْفَ يَأْتِيكَ الْوَحْيُ فَقَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ أَحْيَانًا يَأْتِينِي مِثْلَ صَلْصَلَةِ الْجَرَسِ وَهُوَ أَشَدُّهُ عَلَيَّ فَيُفْصَمُ عَنِّي وَقَدْ وَعَيْتُ عَنْهُ مَا قَالَ وَأَحْيَانًا يَتَمَثَّلُ لِيَ الْمَلَكُ رَجُلًا فَيُكَلِّمُنِي فَأَعِي مَا يَقُولُ.",
      id: "Telah menceritakan kepada kami Abdullah bin Yusuf berkata, telah mengabarkan kepada kami Malik dari Hisham bin Urwah dari ayahnya dari Aisyah Ummul Mu'minin radhiyallahu 'anha, bahwa Harits bin Hisham radhiyallahu 'anhu bertanya kepada Rasulullah shallallahu 'alaihi wa sallam: 'Wahai Rasulullah, bagaimana wahyu datang kepadamu?' Rasulullah shallallahu 'alaihi wa sallam menjawab: 'Kadang-kadang datang kepadaku seperti gemerincing lonceng, dan itulah yang paling berat bagiku, lalu terhenti dariku setelah aku memahami apa yang dikatakannya. Dan kadang-kadang malaikat menyerupai seorang laki-laki lalu berbicara kepadaku, maka aku memahami apa yang dikatakannya.'"
    },
    {
      number: 3,
      arab: "حَدَّثَنَا يَحْيَى بْنُ بُكَيْرٍ حَدَّثَنَا اللَّيْثُ عَنْ عُقَيْلٍ عَنْ ابْنِ شِهَابٍ عَنْ عُرْوَةَ بْنِ الزُّبَيْرِ عَنْ عَائِشَةَ أُمِّ الْمُؤْمِنِينَ أَنَّهَا قَالَتْ أَوَّلُ مَا بُدِئَ بِهِ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ مِنْ الْوَحْيِ الرُّؤْيَا الصَّالِحَةُ فِي النَّوْمِ فَكَانَ لاَ يَرَى رُؤْيَا إِلاَّ جَاءَتْ مِثْلَ فَلَقِ الصُّبْحِ...",
      id: "Telah menceritakan kepada kami Yahya bin Bukair, menceritakan kepada kami Al-Laith dari Uqail dari Ibn Shihab dari Urwah bin Az-Zubair dari Aisyah Ummul Mu'minin bahwa dia berkata: 'Awal mula wahyu yang diturunkan kepada Rasulullah shallallahu 'alaihi wa sallam adalah mimpi yang benar dalam tidur. Beliau tidak melihat mimpi melainkan datang seperti terangnya fajar subuh...'"
    },
    {
      number: 13,
      arab: "حَدَّثَنَا مُسَدَّدٌ قَالَ حَدَّثَنَا يَحْيَى عَنْ شُعْبَةَ عَنْ قَتَادَةَ عَنْ أَنَسٍ رَضِيَ اللَّهُ عَنْهُ عَنْ النَّبِيِّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ وَعَنْ حُسَيْنٍ الْمُعَلِّمِ قَالَ حَدَّثَنَا قَتَادَةُ عَنْ أَنَسٍ عَنْ النَّبِيِّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ قَالَ لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ.",
      id: "Telah menceritakan kepada kami Musaddad berkata, menceritakan kepada kami Yahya dari Shu'bah dari Qatadah dari Anas radhiyallahu 'anhu dari Nabi shallallahu 'alaihi wa sallam bersabda: 'Tidak sempurna iman salah seorang di antara kalian hingga ia menyukai bagi saudaranya apa yang ia sukai bagi dirinya sendiri.'"
    }
  ],
  muslim: [
    {
      number: 1,
      arab: "حَدَّثَنِي أَبُو خَيْثَمَةَ زُهَيْرُ بْنُ حَرْبٍ حَدَّثَنَا وَكِيعٌ عَنْ كَهْمَسٍ عَنْ عَبْدِ اللَّهِ بْنِ بُرَيْدَةَ عَنْ يَحْيَى بْنِ يَعْمَرَ قَالَ: كَانَ أَوَّلَ مَنْ قَالَ فِي الْقَدَرِ بِالْبَصْرَةِ مَعْبَدٌ الْجُهَنِيُّ فَانْطَلَقْتُ أَنَا وَحُمَيْدُ بْنُ عَبْدِ الرَّحْمَنِ الْحِمْيَرِيُّ حَاجَّيْنِ أَوْ مُعْتَمِرَيْنِ فَقُلْنَا لَوْ لَقِينَا أَحَدًا مِنْ أَصْحَابِ رَسُولِ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ فَسَأَلْنَاهُ عَمَّا يَقُولُ هَؤُلاَءِ فِي الْقَدَرِ...",
      id: "Telah menceritakan kepadaku Abu Khaithamah Zuhair bin Harb, menceritakan kepada kami Waki' dari Kahmas dari Abdullah bin Buraidah dari Yahya bin Ya'mar ia berkata: Orang yang pertama kali berbicara tentang takdir di Basrah adalah Ma'bad Al-Juhani. Maka aku dan Humaid bin Abdurrahman Al-Himyari pergi menunaikan ibadah haji atau umrah..."
    },
    {
      number: 8,
      arab: "حَدَّثَنَا أَبُو بَكْرِ بْنُ أَبِي شَيْبَةَ وَزُهَيْرُ بْنُ حَرْبٍ قَالاَ حَدَّثَنَا وَكِيعٌ عَنْ سُفْيَانَ عَنْ أَبِي الزُّبَيْرِ عَنْ جَابِرٍ قَالَ قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: 'بَيْنَ الرَّجُلِ وَبَيْنَ الشِّرْكِ وَالْكُفْرِ تَرْكُ الصَّلاَةِ'.",
      id: "Telah menceritakan kepada kami Abu Bakr bin Abi Shaibah dan Zuhair bin Harb keduanya berkata, menceritakan kepada kami Waki' dari Sufyan dari Abu Az-Zubair dari Jabir berkata, Rasulullah shallallahu 'alaihi wa sallam bersabda: '(Pembeda) antara seseorang dengan kemusyrikan dan kekafiran adalah meninggalkan shalat.'"
    }
  ],
  'abu-daud': [
    {
      number: 1,
      arab: "حَدَّثَنَا عَبْدُ اللَّهِ بْنُ مَسْلَمَةَ الْقَعْنَبِيُّ عَنْ مَالِكٍ عَنْ سَلَمَةَ بْنِ صَفْوَانَ عَنْ زَيْدِ بْنِ أَبِي عَيَّاشٍ أَنَّ سَعْدَ بْنَ أَبِي وَقَّاصٍ قَالَ سَمِعْتُ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ يَقُولُ...",
      id: "Telah menceritakan kepada kami Abdullah bin Maslamah Al-Qa'nabi dari Malik dari Salamah bin Safwan dari Zaid bin Abi Ayyash bahwa Sa'd bin Abi Waqqas berkata: Aku mendengar Rasulullah shallallahu 'alaihi wa sallam bersabda..."
    }
  ],
  tirmidzi: [
    {
      number: 1,
      arab: "حَدَّثَنَا قُتَيْبَةُ حَدَّثَنَا أَبُو عَوَانَةَ عَنْ سِمَاكِ بْنِ حَرْبٍ عَنْ مُصْعَبِ بْنِ سَعْدٍ عَنْ ابْنِ عُمَرَ قَالَ قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: 'لاَ تُقْبَلُ صَلاَةٌ بِغَيْرِ طُهُورٍ وَلاَ صَدَقَةٌ مِنْ غُلُولٍ'.",
      id: "Telah menceritakan kepada kami Qutaibah, menceritakan kepada kami Abu Awanah dari Simak bin Harb dari Mus'ab bin Sa'd dari Ibn Umar berkata, Rasulullah shallallahu 'alaihi wa sallam bersabda: 'Tidak diterima shalat tanpa bersuci, dan tidak diterima sedekah dari harta khianat (ghulul).'"
    }
  ],
  nasai: [
    {
      number: 1,
      arab: "أَخْبَرَنَا قُتَيْبَةُ بْنُ سَعِيدٍ قَالَ حَدَّثَنَا سُفْيَانُ عَنْ الزُّهْرِيِّ عَنْ أَبِي سَلَمَةَ عَنْ أَبِي هُرَيْرَةَ أَنَّ النَّبِيَّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ قَالَ: 'إِذَا اسْتَيْقَظَ أَحَدُكُمْ مِنْ نَوْمِهِ فَلاَ يَغْمِسْ يَدَهُ فِي الإِنَاءِ حَتَّى يَغْسِلَهَا ثَلاَثًا'.",
      id: "Telah mengabarkan kepada kami Qutaibah bin Sa'id berkata, menceritakan kepada kami Sufyan dari Az-Zuhri dari Abu Salamah dari Abu Hurairah bahwa Nabi shallallahu 'alaihi wa sallam bersabda: 'Jika salah seorang di antara kalian bangun dari tidurnya, maka janganlah ia mencelupkan tangannya ke dalam bejana sebelum membasuhnya tiga kali.'"
    }
  ],
  'ibnu-majah': [
    {
      number: 1,
      arab: "حَدَّثَنَا أَبُو بَكْرِ بْنُ أَبِي شَيْبَةَ حَدَّثَنَا مُحَمَّدُ بْنُ بِشْرٍ عَنْ مُحَمَّدِ بْنِ عَمْرٍو عَنْ أَبِي سَلَمَةَ عَنْ أَبِي هُرَيْرَةَ قَالَ قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: 'أَنَا أَوْلَى بِالْمُؤْمِنِينَ مِنْ أَنْفُسِهِمْ'.",
      id: "Telah menceritakan kepada kami Abu Bakr bin Abi Shaibah, menceritakan kepada kami Muhammad bin Bishr dari Muhammad bin Amr dari Abu Salamah dari Abu Hurairah berkata, Rasulullah shallallahu 'alaihi wa sallam bersabda: 'Aku lebih berhak atas orang-orang beriman daripada diri mereka sendiri.'"
    }
  ],
  ahmad: [
    {
      number: 1,
      arab: "حَدَّثَنَا عَبْدُ اللَّهِ حَدَّثَنِي أَبِي حَدَّثَنَا وَكِيعٌ حَدَّثَنَا سُفْيَانُ عَنْ سَلَمَةَ بْنِ كُهَيْلٍ عَنْ حُجَيَّةَ بْنِ عَدِيٍّ عَنْ عَلِيٍّ رَضِيَ اللَّهُ عَنْهُ...",
      id: "Telah menceritakan kepada kami Abdullah, menceritakan kepadaku ayahku, menceritakan kepada kami Waki', menceritakan kepada kami Sufyan dari Salamah bin Kuhail dari Hujiyyah bin Adi dari Ali radhiyallahu 'anhu..."
    }
  ],
  malik: [
    {
      number: 1,
      arab: "حَدَّثَنِي يَحْيَى عَنْ مَالِكٍ عَنْ أَبِي الزِّنَادِ عَنْ الأَعْرَجِ عَنْ أَبِي هُرَيْرَةَ أَنَّ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ قَالَ: 'إِذَا شَرِبَ الْكَلْبُ فِي إِنَاءِ أَحَدِكُمْ فَلْيَغْسِلْهُ سَبْعَ مَرَّاتٍ'.",
      id: "Telah menceritakan kepadaku Yahya dari Malik dari Abu Az-Zinad dari Al-A'raj dari Abu Hurairah bahwa Rasulullah shallallahu 'alaihi wa sallam bersabda: 'Apabila anjing minum di bejana salah seorang di antara kalian, maka hendaklah ia mencucinya tujuh kali.'"
    }
  ],
  darimi: [
    {
      number: 1,
      arab: "أَخْبَرَنَا عَبْدُ اللَّهِ بْنُ عَمْرٍو أَبُو مُحَمَّدٍ الْحَضْرَمِيُّ حَدَّثَنَا عَبْدُ الرَّحْمَنِ بْنُ مَهْدِيٍّ عَنْ سُفْيَانَ عَنْ أَبِي إِسْحَاقَ عَنْ أَبِي الأَحْوَصِ عَنْ عَبْدِ اللَّهِ قَالَ: 'الْعِلْمُ كَثِيرٌ وَلَكِنَّ التَّقْوَى حَسَنَةٌ'.",
      id: "Telah mengabarkan kepada kami Abdullah bin Amr Abu Muhammad Al-Hadrami, menceritakan kepada kami Abdurrahman bin Mahdi dari Sufyan dari Abu Ishaq dari Abu Al-Ahwas dari Abdullah berkata: 'Ilmu itu banyak, tetapi takwa adalah kebaikan.'"
    }
  ]
};
