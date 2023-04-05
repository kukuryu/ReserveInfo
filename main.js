const { app, BrowserWindow } = require('electron')
const path = require('path')

function init () {
  // const win = new BrowserWindow({
  //   width: 800,
  //   height: 600,
  //   webPreferences: {
  //     preload: path.join(__dirname, 'preload.js')
  //   }
  // })

  //win.loadFile('index.html')
  const puppeteer = require("puppeteer");

// puppeteer.executablePath()는 설치한 puppeteer 노드모듈의 번들로 제공되는 chromium 브라우저의 경로의 주소값을 가진다.
// 해당 예제는 puppeteer.launch를 통해 퍼펫티어를 실행할때 해당 경로의 값을 지정한다.
console.log(puppeteer.executablePath());

// 딜레이를 주기 위한 함수
function delay( timeout ) {
  return new Promise(( resolve ) => {
    setTimeout( resolve, timeout );
  });
}


puppeteer.launch({
         headless : false	// 헤드리스모드의 사용여부를 묻는다
	, devtools : false	// 브라우저의 개발자 모드의 오픈 여부를 묻는다
	, executablePath : puppeteer.executablePath()	// 실행할 chromium 기반의 브라우저의 실행 경로를 지정한다.
	, ignoreDefaultArgs : false	// 배열이 주어진 경우 지정된 기본 인수를 필터링한다.(중요 : true사용금지)
	, timeout : 30000	// 브라우저 인스턴스가 시작될 때까지 대기하는 시간(밀리 초)
	, defaultViewport : { width : 800, height : 600 }	// 실행될 브라우저의 화면 크기를 지정한다.
	, args : [ "about:blank" ]
}).then(async browser => {

	const page = await browser.newPage();
	
	// 새탭을 열고 작업을 수행할 페이지를 지정한다.
	await page.goto( "https://nid.naver.com/nidlogin.login?svctype=1&locale=ko_KR&url=https%3A%2F%2Fsmartplace.naver.com%2F&area=bbt", { waitUntil : "networkidle2" } );
	
	// 5초간딜레이를 준다.
	await delay(5000);
	
	// 스크린샷을 찍는다.
	//await page.screenshot( { path : "wickedBlog.png" } );
	
	// 모든 작업을 수행하면 브라우저를 닫고 퍼펫티어를 종료한다.
	//wait browser.close();
});

}

app.whenReady().then(() => {
  init()

  // app.on('activate', () => {
  //   if (BrowserWindow.getAllWindows().length === 0) {
  //     init()

      



  //   }
  // })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})