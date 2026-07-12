// --- オープニング画面の制御 ---
window.addEventListener('load', () => {
    const splashScreen = document.getElementById('splash-screen');
    const splashTitle = document.querySelector('.splash-content h1');
    const credits = document.querySelector('#splash-screen .credits');
    const appContainer = document.getElementById('app-container');
    setTimeout(() => { splashTitle.classList.add('visible'); }, 500);
    setTimeout(() => { credits.classList.add('visible'); }, 1200);
    setTimeout(() => { splashScreen.classList.add('hidden'); }, 4000);
    setTimeout(() => {
        if (splashScreen) { splashScreen.style.display = 'none'; }
        if (appContainer) { appContainer.classList.remove('hidden'); }
    }, 5000);
});

// --- 星座図鑑アプリ本体の制御 ---
document.addEventListener('DOMContentLoaded', () => {
    
    // 全88星座のデータ (画像URLなし)
    const constellations = [
        { name_jp: "おおぐま座", name_en: "Ursa Major", description: "北斗七星を含む大きな星座。一年中北の空に見えます。", famous_star: "ドゥーベ, メラク", best_season: "春", mythology: "大神ゼウスが浮気相手のカリストを、正妻ヘラの嫉妬から守るために熊の姿に変えたという神話が有名です。後に息子のアルカス（うしかい座）と再会し、共に天に上げられました。", info: "北斗七星のひしゃくの先端にある2つの星、メラクとドゥーベを結んで5倍伸ばすと、ほぼ正確に北極星の位置を示すことができます。" },
        { name_jp: "こぐま座", name_en: "Ursa Minor", description: "北極星ポラリスを含む星座。おおぐま座の近くにあります。", famous_star: "ポラリス（北極星）", best_season: "春", mythology: "おおぐま座に変えられたカリストの息子アルカスが、こぐまの姿に変えられて天に上げられた姿だとされています。", info: "現在の北極星であるポラリスは、地球の歳差運動により約2000年前は天の北極からずれていました。古代エジプトではりゅう座のトゥバンが北極星でした。" },
        { name_jp: "うしかい座", name_en: "Boötes", description: "春の夜空に輝くオレンジ色のアークトゥルスが目印です。", famous_star: "アークトゥルス", best_season: "春", mythology: "おおぐま座（カリスト）を追いかける息子のアルカスの姿だとされています。", info: "アークトゥルスは「熊の番人」という意味を持つ、太陽系から約37光年の距離にある赤色巨星です。" },
        { name_jp: "おとめ座", name_en: "Virgo", description: "春の夜空で輝く白い一等星スピカを持つ大きな星座です。", famous_star: "スピカ", best_season: "春", mythology: "農業の女神デメテルや、正義の女神アストライアの姿に見立てられています。", info: "スピカは「麦の穂」という意味。おとめ座の領域には数千個の銀河が集まる「おとめ座銀河団」があり、宇宙の巨大構造を観測できます。" },
        { name_jp: "しし座", name_en: "Leo", description: "「？」マークを裏返したような星の並びが特徴的な星座です。", famous_star: "レグルス", best_season: "春", mythology: "英雄ヘルクレスに退治されたネメアの谷の人食いライオンの姿です。", info: "毎年11月中旬にしし座流星群が見られます。" },
        { name_jp: "かに座", name_en: "Cancer", description: "あまり明るい星はありませんが、プレセペ星団があります。", famous_star: "アルタルフ", best_season: "春", mythology: "英雄ヘルクレスとの戦いでヘラに遣わされた巨大な化け蟹カルキノスの姿。", info: "中心部には「プレセペ星団(M44)」という美しい星団があり、双眼鏡で見ることができます。" },
        { name_jp: "からす座", name_en: "Corvus", description: "台形に並んだ4つの星が目印となる小さな星座です。", famous_star: "ギェナー", best_season: "春", mythology: "太陽神アポロンの使いであったが、嘘をついたために罰として天に張り付けられたカラスの姿。", info: "" },
        { name_jp: "かみのけ座", name_en: "Coma Berenices", description: "多くの銀河が観測できる領域として知られています。", famous_star: "ディアデム", best_season: "春", mythology: "エジプトの王妃ベレニケ2世が、夫の戦勝を祈願して神に捧げた美しい髪が天に上げられたもの。", info: "かみのけ座銀河団が存在し、天の川銀河が属するおとめ座超銀河団の一部を成しています。" },
        { name_jp: "りょうけん座", name_en: "Canes Venatici", description: "子持ち銀河(M51)があることで有名な星座です。", famous_star: "コル・カロリ", best_season: "春", mythology: "うしかい座が連れている2匹の猟犬の姿。", info: "有名な渦巻銀河「子持ち銀河(M51)」は、大きな銀河のすぐそばに小さな銀河が寄り添っているように見えます。" },
        { name_jp: "うみへび座", name_en: "Hydra", description: "全天で最も大きな面積を持つ長い星座です。", famous_star: "アルファルド", best_season: "春", mythology: "ヘルクレスに退治された、レルネの谷に住む9つの頭を持つヒュドラの姿。", info: "アルファルドはアラビア語で「孤独なもの」を意味し、その名の通り周りに明るい星がありません。" },
        { name_jp: "コップ座", name_en: "Crater", description: "うみへび座の背中に乗った杯の形をしています。", famous_star: "アルケス", best_season: "春", mythology: "太陽神アポロンが使わせたカラスが、水汲みの途中で道草をした言い訳に使ったコップ。", info: "" },
        { name_jp: "ろくぶんぎ座", name_en: "Sextans", description: "天文学者ヘヴェリウスによって設定された比較的新しい星座です。", famous_star: "α星", best_season: "春", mythology: "17世紀の天文学者ヘヴェリウスが愛用した六分儀がモチーフ。神話はありません。", info: "" },
        { name_jp: "こじし座", name_en: "Leo Minor", description: "しし座の足元に位置する小さな星座です。", famous_star: "プラエキプア", best_season: "春", mythology: "17世紀に設定された星座で、特定の神話はありません。", info: "" },
        { name_jp: "やまねこ座", name_en: "Lynx", description: "おおぐま座とふたご座の間に位置する星座です。", famous_star: "α星", best_season: "春", mythology: "「ヤマネコのような鋭い目がないと見えない」として名付けられた星座。神話はありません。", info: "" },
        { name_jp: "さそり座", name_en: "Scorpius", description: "夏の南の空に輝くS字カーブが美しい星座です。", famous_star: "アンタレス", best_season: "夏", mythology: "巨人オリオンを刺し殺したサソリ。オリオンが空に昇ると、それを避けるように地平線に沈むと言われています。", info: "心臓の位置で赤く輝くアンタレスは「火星に対抗するもの」という意味の赤色超巨星です。" },
        { name_jp: "いて座", name_en: "Sagittarius", description: "天の川が最も濃く見える方向にある星座。南斗六星が有名です。", famous_star: "カウス・アウストラリス", best_season: "夏", mythology: "弓を引く半人半馬の賢者ケイローンの姿とされています。", info: "この星座の方向には、私たちの天の川銀河の中心があります。そのため、天の川が最も濃く見えます。" },
        { name_jp: "こと座", name_en: "Lyra", description: "夏の大三角のひとつ、青白いベгаが輝く小さな星座です。", famous_star: "ベガ", best_season: "夏", mythology: "ギリシャ神話の名手オルフェウスが奏でた竪琴。その音色は神々をも魅了したと言われます。", info: "ベガは七夕の「織姫星」です。約1万2000年後には、地球の歳差運動によりベガが北極星になります。" },
        { name_jp: "わし座", name_en: "Aquila", description: "夏の大三角のひとつ、アルタイルが輝く星座です。", famous_star: "アルタイル", best_season: "夏", mythology: "大神ゼウスが美少年ガニメデをさらうために変身したワシの姿。", info: "アルタイルは七夕の「彦星」です。アラビア語で「飛ぶワシ」を意味します。" },
        { name_jp: "はくちょう座", name_en: "Cygnus", description: "天の川に大きな十字を描く、夏の大三角のひとつデネブを持つ星座。", famous_star: "デネブ", best_season: "夏", mythology: "大神ゼウスがスパルタの王妃レダに近づくために変身した白鳥の姿。", info: "天の川に沿って広がる十字の形は「北十字」とも呼ばれます。デネブは太陽の数万倍の明るさを持つ巨星です。" },
        { name_jp: "いるか座", name_en: "Delphinus", description: "ひし形に並んだ星が特徴の、夏の小さな星座です。", famous_star: "スアロキン", best_season: "夏", mythology: "海神ポセイドンの使いとして、女神を説得したイルカが天に上げられた姿。", info: "" },
        { name_jp: "や座", name_en: "Sagitta", description: "天の川の中に位置する小さな矢の形をした星座です。", famous_star: "シャム", best_season: "夏", mythology: "愛の神エロス（キューピッド）が放った矢、あるいはヘルクレスがワシを射抜いた矢など諸説あります。", info: "" },
        { name_jp: "へびつかい座", name_en: "Ophiuchus", description: "黄道13番目の星座としても知られています。", famous_star: "ラス・アルハゲ", best_season: "夏", mythology: "ギリシャ神話の名医アスクレピオスの姿。死者さえも蘇らせる能力を持ったため、冥王ハデスの怒りを買いゼウスに殺されたが、功績を称えられ天に上げられた。", info: "" },
        { name_jp: "へび座", name_en: "Serpens", description: "へびつかい座に分断された、唯一の飛び地の星座です。", famous_star: "ウヌクアルハイ", best_season: "夏", mythology: "名医アスクレピオスが持つ、薬草の知識を授けてくれたヘビ。", info: "頭部(Serpens Caput)と尾部(Serpens Cauda)に分かれています。" },
        { name_jp: "ヘルクレス座", name_en: "Hercules", description: "球状星団M13があることで知られる大きな星座です。", famous_star: "ラス・アルゲティ", best_season: "夏", mythology: "ギリシャ神話最大の英雄ヘラクレスの姿。12の難業を成し遂げた功績で星座となった。", info: "M13は北天最大級の球状星団で、数十万個の星が集まっています。" },
        { name_jp: "てんびん座", name_en: "Libra", description: "黄道十二星座の一つで、かつてはさそり座の一部でした。", famous_star: "ズベン・エス・カマリ", best_season: "夏", mythology: "正義の女神アストライアが、善悪を計るために使った天秤。", info: "" },
        { name_jp: "かんむり座", name_en: "Corona Borealis", description: "半円状に星が並んだ、美しいかんむりのような星座です。", famous_star: "アルフェッカ", best_season: "夏", mythology: "クレタ島の王女アリアドネが結婚式で身につけた髪飾り。", info: "" },
        { name_jp: "みなみのかんむり座", name_en: "Corona Australis", description: "いて座の足元に位置する小さな星座です。", famous_star: "メリディアナ", best_season: "夏", mythology: "いて座のモデルである賢者ケイローンのかんむりとも言われる。", info: "" },
        { name_jp: "こぎつね座", name_en: "Vulpecula", description: "亜鈴状星雲(M27)があることで知られています。", famous_star: "アンサー", best_season: "夏", mythology: "17世紀に設定された星座。神話はありません。", info: "M27は惑星状星雲で、鉄アレイのような形をしていることから「亜鈴状星雲」と呼ばれます。" },
        { name_jp: "たて座", name_en: "Scutum", description: "天の川の中に位置する小さな星座です。", famous_star: "α星", best_season: "夏", mythology: "ポーランド王ヤン3世ソビエスキの盾がモチーフ。神話はありません。", info: "" },
        { name_jp: "アンドロメダ座", name_en: "Andromeda", description: "アンドロメダ銀河(M31)があることで非常に有名な星座です。", famous_star: "アルフェラッツ", best_season: "秋", mythology: "エチオピアの王女アンドロメダの姿。海の怪物の生贄にされそうになったところを英雄ペルセウスに助けられた。", info: "アンドロメダ銀河は、肉眼で見える最も遠い天体（約250万光年）です。" },
        { name_jp: "カシオペヤ座", name_en: "Cassiopeia", description: "北の空に「W」や「M」の形に並ぶ、見つけやすい星座です。", famous_star: "シェダル", best_season: "秋", mythology: "アンドロメダの母である王妃カシオペヤの姿。娘の美しさを自慢しすぎたため、罰として一日中玉座に座り続ける姿で天に上げられた。", info: "" },
        { name_jp: "ペガスス座", name_en: "Pegasus", description: "秋の四辺形を構成する大きな星座です。", famous_star: "マルカブ", best_season: "秋", mythology: "英雄ペルセウスがメドゥーサを退治した際に、その血から生まれた天馬ペガサスの姿。", info: "「秋の四辺形」は、秋の星座を見つけるための重要な目印です。" },
        { name_jp: "うお座", name_en: "Pisces", description: "2匹の魚がリボンで結ばれた姿を描いた星座です。", famous_star: "アルレシャ", best_season: "秋", mythology: "女神アフロディーテとその子エロスが、怪物テュポンから逃げるために魚に変身した姿。", info: "" },
        { name_jp: "みずがめ座", name_en: "Aquarius", description: "あまり目立つ星はありませんが、黄道十二星座の一つです。", famous_star: "サダルメリク", best_season: "秋", mythology: "大神ゼウスに仕え、神々の宴でお酒を注ぐ美少年ガニメデの姿。", info: "" },
        { name_jp: "やぎ座", name_en: "Capricornus", description: "逆三角形の星の並びが特徴の星座です。", famous_star: "デネブ・アルゲディ", best_season: "秋", mythology: "上半身がヤギ、下半身が魚の姿をした牧神パーンの姿。", info: "" },
        { name_jp: "ペルセウス座", name_en: "Perseus", description: "変光星アルゴルや二重星団h-χで知られています。", famous_star: "アルゴル", best_season: "秋", mythology: "怪物メドゥーサを退治し、アンドロメダ姫を救った英雄ペルセウスの姿。", info: "アルゴルは「悪魔の星」と呼ばれ、約3日間隔で明るさが変わる食変光星です。" },
        { name_jp: "おひつじ座", name_en: "Aries", description: "黄道十二星座の一つ。春分点があった星座として知られます。", famous_star: "ハマル", best_season: "秋", mythology: "王子プリクソスと王女ヘレを乗せて空を飛んだ、金色の毛を持つ羊の姿。", info: "" },
        { name_jp: "さんかく座", name_en: "Triangulum", description: "さんかく座銀河(M33)がある小さな星座です。", famous_star: "モタラー", best_season: "秋", mythology: "ナイル川のデルタ地帯や、シチリア島をかたどったものと言われる。", info: "M33はアンドロメダ銀河、天の川銀河と共に局部銀河群を構成する主要な銀河です。" },
        { name_jp: "ケフェウス座", name_en: "Cepheus", description: "カシオペヤ座の隣にある、家のような形をした星座です。", famous_star: "アルデラミン", best_season: "秋", mythology: "アンドロメダ姫の父、古代エチオピアの王ケフェウスの姿。", info: "ガーネット・スターと呼ばれる、非常に赤い色をした有名な恒星があります。" },
        { name_jp: "とかげ座", name_en: "Lacerta", description: "はくちょう座とアンドロメダ座の間にある小さな星座です。", famous_star: "α星", best_season: "秋", mythology: "17世紀に設定された星座。神話はありません。", info: "" },
        { name_jp: "ちょうこくしつ座", name_en: "Sculptor", description: "南の空の低い位置に見える星座です。", famous_star: "α星", best_season: "秋", mythology: "18世紀に設定された星座。彫刻家のアトリエがモチーフ。神話はありません。", info: "" },
        { name_jp: "くじら座", name_en: "Cetus", description: "変光星ミラがあることで有名な、大きな星座です。", famous_star: "ミラ", best_season: "秋", mythology: "アンドロメダ姫を襲った海の怪物の姿。", info: "ミラは「不思議な」という意味で、約332日の周期で明るさが大きく変わる脈動変光星です。" },
        { name_jp: "みなみのうお座", name_en: "Piscis Austrinus", description: "秋の南の空に輝く一等星フォーマルハウトが目印です。", famous_star: "フォーマルハウト", best_season: "秋", mythology: "うお座の親とも言われる大きな魚の姿。", info: "フォーマルハウトは「秋のひとつ星」とも呼ばれ、秋の寂しい夜空で目立ちます。" },
        { name_jp: "オリオン座", name_en: "Orion", description: "冬の夜空で最も目立つ星座。三つ星やオリオン大星雲が有名。", famous_star: "ベテルギウス, リゲル", best_season: "冬", mythology: "ギリシャ神話の巨人狩人オリオンの姿。その傲慢さから女神ヘラが遣わしたサソリに刺されて死に、天に上げられたとされています。", info: "左肩のベテルギウスは赤色超巨星で、いつ超新星爆発を起こしてもおかしくない状態です。右足のリゲルは青白い巨星。中央の三つ星の下には、新しい星が生まれているオリオン大星雲(M42)が肉眼でも見えます。" },
        { name_jp: "おおいぬ座", name_en: "Canis Major", description: "全天で最も明るい恒星シリウスを持つ星座です。", famous_star: "シリウス", best_season: "冬", mythology: "狩人オリオンが連れている猟犬の姿。", info: "シリウスは太陽を除けば地球から見える最も明るい恒星です。距離は約8.6光年と非常に近い。" },
        { name_jp: "こいぬ座", name_en: "Canis Minor", description: "冬の大三角のひとつ、プロキオンが輝く小さな星座です。", famous_star: "プロキオン", best_season: "冬", mythology: "狩人オリオンが連れているもう一匹の猟犬の姿。", info: "プロキオンは「犬の前に」という意味で、シリウスより先に地平線から昇ることに由来します。" },
        { name_jp: "ふたご座", name_en: "Gemini", description: "カストルとポルックスの二つの明るい星が仲良く並んでいます。", famous_star: "ポルックス, カストル", best_season: "冬", mythology: "大神ゼウスの双子の息子、カストルとポルックスの姿。兄弟の深い絆が称えられ星座となった。", info: "" },
        { name_jp: "おうし座", name_en: "Taurus", description: "プレアデス星団(すばる)やヒアデス星団を持つ星座です。", famous_star: "アルデバラン", best_season: "冬", mythology: "大神ゼウスが王女エウロパに近づくために変身した、美しい白い牛の姿。", info: "プレアデス星団(M45)は日本では「すばる」として古くから親しまれています。" },
        { name_jp: "ぎょしゃ座", name_en: "Auriga", description: "明るい星カペラと、五角形の星の並びが特徴です。", famous_star: "カペラ", best_season: "冬", mythology: "アテネの王エリクトニオスの姿。馬車を発明した功績で星座となった。", info: "" },
        { name_jp: "うさぎ座", name_en: "Lepus", description: "オリオン座の足元に位置する小さな星座です。", famous_star: "アルネブ", best_season: "冬", mythology: "狩人オリオンに追いかけられているウサギの姿。", info: "" },
        { name_jp: "いっかくじゅう座", name_en: "Monoceros", description: "ばら星雲があることで知られる、天の川の中の星座です。", famous_star: "β星", best_season: "冬", mythology: "伝説の生き物ユニコーンがモチーフ。神話はありません。", info: "" },
        { name_jp: "エリダヌス座", name_en: "Eridanus", description: "オリオン座から南の地平線へと長く伸びる星座です。", famous_star: "アケルナル", best_season: "冬", mythology: "神話上の川、エリダヌス川をかたどった星座。", info: "南の端にあるアケルナルは「川の果て」という意味です。" },
        { name_jp: "はと座", name_en: "Columba", description: "おおいぬ座の南に位置する小さな星座です。", famous_star: "ファクト", best_season: "冬", mythology: "ノアの箱舟のノアが、陸地を探すために放ったハト。", info: "" },
        { name_jp: "ちょうこくぐ座", name_en: "Caelum", description: "エリダヌス座とはと座の間に位置する小さな星座です。", famous_star: "α星", best_season: "冬", mythology: "彫刻に使う「のみ」がモチーフ。神話はありません。", info: "" },
        { name_jp: "ろ座", name_en: "Fornax", description: "エリダヌス座の中にある小さな星座です。", famous_star: "フォルナキス", best_season: "冬", mythology: "化学実験に使う「炉」がモチーフ。神話はありません。", info: "" },
        { name_jp: "とも座", name_en: "Puppis", description: "かつて存在したアルゴ船座の一部です。", famous_star: "ナオス", best_season: "冬", mythology: "アルゴ探検隊が乗った船アルゴ号の船尾（とも）の部分。", info: "" },
        { name_jp: "りゅうこつ座", name_en: "Carina", description: "シリウスに次いで明るいカノープスを持つ、南天の星座です。", famous_star: "カノープス", best_season: "南天", mythology: "アルゴ号の竜骨（船底の中心材）の部分。", info: "カノープスは日本では房総半島より南でないと見ることが難しい星です。" },
        { name_jp: "ほ座", name_en: "Vela", description: "かつてのアルゴ船座の一部で、帆の部分にあたります。", famous_star: "γ星", best_season: "南天", mythology: "アルゴ号の帆の部分。", info: "" },
        { name_jp: "らしんばん座", name_en: "Pyxis", description: "かつてのアルゴ船座の近くに設定された小さな星座です。", famous_star: "α星", best_season: "南天", mythology: "アルゴ号の羅針盤。神話はありません。", info: "" },
        { name_jp: "ケンタウルス座", name_en: "Centaurus", description: "太陽系に最も近い恒星リギル・ケンタウルスを持つ星座です。", famous_star: "リギル・ケンタウルス", best_season: "南天", mythology: "ギリシャ神話に登場する賢者ケイローンの姿。", info: "リギル・ケンタウルス（アルファ・ケンタウリ）は太陽系から約4.3光年の距離にある最も近い恒星系です。" },
        { name_jp: "みなみじゅうじ座", name_en: "Crux", description: "南半球を代表する星座で、南十字星として有名です。", famous_star: "アクルックス", best_season: "南天", mythology: "比較的新しい星座のため古代の神話はありませんが、大航海時代に南半球の航海の目印として使われました。", info: "日本では沖縄など南の地域で、地平線すれすれに見ることができます。天の南極を探すための重要な目印となります。" },
        { name_jp: "さいだん座", name_en: "Ara", description: "さそり座の尾の南に位置する星座です。", famous_star: "β星", best_season: "南天", mythology: "神々がティタン族との戦いの前に、勝利を誓った祭壇。", info: "" },
        { name_jp: "つる座", name_en: "Grus", description: "みなみのうお座の南に位置する、比較的大きな星座です。", famous_star: "アルナイル", best_season: "南天", mythology: "16世紀に設定された星座。神話はありません。", info: "" },
        { name_jp: "ほうおう座", name_en: "Phoenix", description: "つる座とエリダヌス座の間に位置する星座です。", famous_star: "アンカア", best_season: "南天", mythology: "伝説の鳥フェニックス（不死鳥）がモチーフ。神話はありません。", info: "" },
        { name_jp: "きょしちょう座", name_en: "Tucana", description: "小マゼラン雲があることで知られる南天の星座です。", famous_star: "α星", best_season: "南天", mythology: "南米の鳥トゥッカーノがモチーフ。神話はありません。", info: "私たちの銀河の伴銀河である「小マゼラン雲」がこの星座の領域にあります。" },
        { name_jp: "インディアン座", name_en: "Indus", description: "きょしちょう座とつる座の間に位置します。", famous_star: "ペルシアン", best_season: "南天", mythology: "アメリカの先住民がモチーフ。神話はありません。", info: "" },
        { name_jp: "くじゃく座", name_en: "Pavo", description: "天の南極近くに位置する星座です。", famous_star: "ピーコック", best_season: "南天", mythology: "女神ヘラが可愛がっていたクジャクがモチーフ。", info: "" },
        { name_jp: "じょうぎ座", name_en: "Norma", description: "さそり座とケンタウルス座の間にある小さな星座です。", famous_star: "γ2星", best_season: "南天", mythology: "大工の使う定規がモチーフ。神話はありません。", info: "" },
        { name_jp: "ぼうえんきょう座", name_en: "Telescopium", description: "いて座とさいだん座の間に位置する小さな星座です。", famous_star: "α星", best_season: "南天", mythology: "望遠鏡がモチーフ。神話はありません。", info: "" },
        { name_jp: "けんびきょう座", name_en: "Microscopium", description: "やぎ座といて座の南に位置する星座です。", famous_star: "γ星", best_season: "南天", mythology: "顕微鏡がモチーフ。神話はありません。", info: "" },
        { name_jp: "コンパス座", name_en: "Circinus", description: "ケンタウルス座の足元にある小さな星座です。", famous_star: "α星", best_season: "南天", mythology: "製図に使うコンパスがモチーフ。神話はありません。", info: "" },
        { name_jp: "みなみのさんかく座", name_en: "Triangulum Australe", description: "ケンタウルス座の近くにある明るい三角形が特徴です。", famous_star: "アトリア", best_season: "南天", mythology: "16世紀に設定された星座。神話はありません。", info: "" },
        { name_jp: "ふうちょう座", name_en: "Apus", description: "天の南極の近くにある小さな星座です。", famous_star: "α星", best_season: "南天", mythology: "極楽鳥がモチーフ。神話はありません。", info: "" },
        { name_jp: "カメレオン座", name_en: "Chamaeleon", description: "天の南極近くにあり、暗い星で構成されています。", famous_star: "α星", best_season: "南天", mythology: "カメレオンがモチーフ。神話はありません。", info: "" },
        { name_jp: "とびうお座", name_en: "Volans", description: "りゅうこつ座の近くに位置する小さな星座です。", famous_star: "β星", best_season: "南天", mythology: "トビウオがモチーフ。神話はありません。", info: "" },
        { name_jp: "がか座", name_en: "Pictor", description: "りゅうこつ座のカノープスの西に位置します。", famous_star: "α星", best_season: "南天", mythology: "画家のイーゼルがモチーフ。神話はありません。", info: "" },
        { name_jp: "かじき座", name_en: "Dorado", description: "大マゼラン雲があることで非常に有名な星座です。", famous_star: "α星", best_season: "南天", mythology: "カジキマグロがモチーフ。神話はありません。", info: "私たちの銀河の伴銀河である「大マゼラン雲」がこの星座の領域にあります。" },
        { name_jp: "レチクル座", name_en: "Reticulum", description: "かじき座の西に位置する、ひし形の小さな星座です。", famous_star: "α星", best_season: "南天", mythology: "望遠鏡の接眼レンズ内にあるメモリ（レチクル）がモチーフ。神話はありません。", info: "" },
        { name_jp: "みずへび座", name_en: "Hydrus", description: "天の南極近くで、大小マゼラン雲の間にあります。", famous_star: "β星", best_season: "南天", mythology: "ウミヘビがモチーフ。神話はありません。", info: "" },
        { name_jp: "とけい座", name_en: "Horologium", description: "エリダヌス座の南に位置する、暗い星からなる星座です。", famous_star: "α星", best_season: "南天", mythology: "振り子時計がモチーフ。神話はありません。", info: "" },
        { name_jp: "テーブルさん座", name_en: "Mensa", description: "天の南極に最も近い星座で、非常に暗い星で構成されます。", famous_star: "α星", best_season: "南天", mythology: "南アフリカのテーブルマウンテンがモチーフ。神話はありません。", info: "" },
        { name_jp: "はえ座", name_en: "Musca", description: "みなみじゅうじ座のすぐ南にある小さな星座です。", famous_star: "α星", best_season: "南天", mythology: "ハエがモチーフ。神話はありません。", info: "" },
        { name_jp: "りゅう座", name_en: "Draco", description: "こぐま座を取り囲むように長く伸びる星座です。", famous_star: "トゥバン", best_season: "北天", mythology: "ヘスペリデスの黄金のリンゴを守っていた竜ラドンの姿。", info: "約4800年前には、3等星のトゥバンが天の北極に最も近い星、つまり北極星でした。" },
        { name_jp: "きりん座", name_en: "Camelopardalis", description: "北極星の近くにありますが、暗い星が多く目立ちません。", famous_star: "β星", best_season: "北天", mythology: "17世紀に設定された星座。神話はありません。", info: "" },
        { name_jp: "おおかみ座", name_en: "Lupus", description: "ケンタウルス座とさそり座の間に位置する星座です。", famous_star: "α星", best_season: "南天", mythology: "ケンタウルス座のケイローンが、神々への生贄として祭壇に捧げるオオカミの姿。", info: "" },
        { name_jp: "ポンプ座", name_en: "Antlia", description: "うみへび座の南に位置する暗い星座です。", famous_star: "α星", best_season: "南天", mythology: "空気ポンプがモチーフ。神話はありません。", info: "" },
        { name_jp: "はちぶんぎ座", name_en: "Octans", description: "天の南極を含む星座ですが、明るい星はありません。", famous_star: "ν星", best_season: "南天", mythology: "八分儀がモチーフ。神話はありません。", info: "天の南極がこの星座の領域にありますが、北極星のような明るい星はありません。" },
    ];


    const grid = document.getElementById('constellation-grid');
    const modal = document.getElementById('modal');
    const closeModalButton = document.getElementById('close-button');
    const modalDescriptionContainer = document.getElementById('modal-description-container');

    const createConstellationCards = () => {
        const fragment = document.createDocumentFragment();
        constellations.sort((a, b) => a.name_jp.localeCompare(b.name_jp, 'ja'));
        
        constellations.forEach(c => {
            const card = document.createElement('div');
            card.className = 'constellation-card';
            card.textContent = c.name_jp;
            card.addEventListener('click', () => showModal(c));
            fragment.appendChild(card);
        });
        grid.appendChild(fragment);

        const cards = grid.querySelectorAll('.constellation-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 50); 
        });
    };

    const showModal = (constellation) => {
        document.getElementById('modal-name-jp').textContent = constellation.name_jp;
        document.getElementById('modal-name-en').textContent = constellation.name_en;
        document.getElementById('modal-season').textContent = constellation.best_season;
        document.getElementById('modal-star').textContent = constellation.famous_star;
        
        let descriptionHTML = `<p>${constellation.description}</p>`;
        if (constellation.mythology) {
            descriptionHTML += `<h4>神話</h4><p>${constellation.mythology}</p>`;
        }
        if (constellation.info) {
            descriptionHTML += `<h4>補足情報</h4><p>${constellation.info}</p>`;
        }
        modalDescriptionContainer.innerHTML = descriptionHTML;
        
        modal.classList.remove('hidden');
    };

    const closeModal = () => {
        modal.classList.add('hidden');
    };

    closeModalButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    if (grid) {
        createConstellationCards();
    }
});
