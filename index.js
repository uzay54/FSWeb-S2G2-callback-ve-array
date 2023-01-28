const { fifaData } = require('./fifa.js')


/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

// console.log(filter1(2014));
// //(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)

const finaller= fifaData.filter(mac => mac.Stage == "Final")
const final2014= finaller.filter(mac => mac.Year == 2014)

console.log(final2014);

console.log(final2014[0]["Home Team Name"]);

//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)
console.log(final2014[0]["Away Team Name"]);
//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)
console.log(final2014[0]["Home Team Goals"]);
//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)
console.log(final2014[0]["Away Team Goals"]);
//(e) 2014 Dünya kupası finali kazananı*/

if (final2014[0]["Home Team Goals"] > final2014[0]["Away Team Goals"]) {
	console.log(final2014[0]["Home Team Name"]);
} else if (final2014[0]["Away Team Goals"] > final2014[0]["Home Team Goals"]) {
	console.log(final2014[0]["Away Team Name"]);
} else {
	console.log("Beraberlik!");
}

/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(array) {
	let tumFinaller = array.filter(mac => mac.Stage == "Final");
	return tumFinaller;
 }

 console.log(Finaller(fifaData));


/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(array,callback) {
	let tumFinaller = callback(array);
	let years = tumFinaller.map(mac => {return mac.Year} )

	return years;
}
console.log(Yillar(fifaData,Finaller));

/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */ 

function Kazananlar(array,callback) {
	
	const kazananlar = callback(array).map( (mac) => {
		if (mac["Home Team Goals"] > mac["Away Team Goals"]) {
			return mac["Home Team Name"]
		} else if (mac["Home Team Goals"] < mac["Away Team Goals"]) {
			return mac["Away Team Name"]
		} else {
			return "Beraberlik!"
		}
	})

	return kazananlar;

	//let tumFinaller= callback(array);
    //let winners = [];
	// for (let i = 0; i < tumFinaller.length; i++) {

	// 	if (tumFinaller[i]['Home Team Goals'] > tumFinaller[i]['Away Team Goals']) {
	// 		winners.push[i]['Home Team Name']; ==> Burada patladı.

	// 	} else if (tumFinaller[i]['Home Team Goals'] < tumFinaller[i]['Away Team Goals']) {

	// 		winners.push[i]['Away Team Name'];
	// 	}
	// }

	// return winners;
	
}

console.log(Kazananlar(fifaData,Finaller))

/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(array,callbackFinaller,callbackYillar,callbackKazananlar) {

	let str = [];

	let yillar = callbackYillar(array,callbackFinaller);
	let winners = callbackKazananlar(array,callbackFinaller);

	for (let i = 0; i < yillar.length; i++) {
		str.push(`${yillar[i]} yılında, ${winners[i]} dünya kupasını kazandı!`);		
	}

	return str;
}

console.log(YillaraGoreKazananlar(fifaData,Finaller,Yillar,Kazananlar));

/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(callbackFinaller) {
	
	let toplam = callbackFinaller.reduce((sum,tekmac) => sum + tekmac["Home Team Goals"] + tekmac["Away Team Goals"],0);

	let ortalamaGol = (toplam / callbackFinaller.length).toFixed(2);

	return ortalamaGol;
	
}


console.log(OrtalamaGolSayisi(Finaller(fifaData)));

/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(/* kodlar buraya */) {
	
    /* kodlar buraya */
	
}



/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(/* kodlar buraya */) {
	
    /* kodlar buraya */
	
}


/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(/* kodlar buraya */) {
	
    /* kodlar buraya */
	
}


/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */


/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa(){
    console.log('Kodlar çalışıyor');
    return 'as';
}
sa();
module.exports = {
    sa,
    Finaller,
    Yillar,
    Kazananlar,
    YillaraGoreKazananlar,
    OrtalamaGolSayisi
}