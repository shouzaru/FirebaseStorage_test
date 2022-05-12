// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "**************",
    authDomain: "**************",
    databaseURL: "**************",
    projectId: "**************",
    storageBucket: "**************",
    messagingSenderId: "**************",
    appId: "**************",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



//ファイルの選択
let file;
let date;
let metadata;
let shiainohi;

document.getElementById("date").onclick = function() {
    let fbtn = document.getElementById("file")
    fbtn.disabled = false;   //「ファイルを選択」ボタンを有効にする
  };


document.getElementById('file').addEventListener('change',(event) => { //addEventListener('change', function(){});と同じ。引数'change'は「変化があった時」の意味。
    file = event.target.files[0];  //evemt.targetはクリックした要素のこと。ここでは<input type="file" id="file">。filesの配列の0番目を取得。
    let FUbtn = document.getElementById("fileUpload")
    FUbtn.disabled = false;   //「クリックしてアップロード開始」ボタンを有効にする

});


    function UPLOAD(){  
    const storageRef = firebase.storage().ref('images/' + file.name); //保存場所のパスを指定。
    let date = document.getElementById("date").value;
    let metadata = {customMetadata:{'date': date }};

    //指定した場所にfileをputする。メタデータをつける。そのときにon()関数動く。プログレスバーの表示。
    storageRef.put(file, metadata).on('state_changed', (snapshot) => {    
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        const progressBar = document.getElementById('progress_bar');
        progressBar.value = progress;
        console.log(progress);
        if(progress === 100)document.getElementById('status').append("アップロード完了");    
    });
    };


    document.getElementById("shiainohi").onclick = function() {
        let dlbtn = document.getElementById("fileDownload")
        dlbtn.disabled = false;   //「ファイルを選択」ボタンを有効にする
      };


    async function DOWNLOAD(){
        shiainohi = document.getElementById("shiainohi").value;  //ダウンロードしたい日付を一時保管
        document.getElementById("fileDownload").disabled = true;      // ボタンを無効にする(何回も押せないように)

        let res = await firebase.storage().ref('images/').listAll();  //firebese_Storageの「images」というディレクトリからリスト取得
        let itemslength = res.items.length;  //ストレージに存在するアイテムのリストを取得

        for(i=0; i<itemslength; i++){  //itemsの数だけ繰り返す
            let namae = res.items[i].name  //名前取得
            let res_items_url =res.items[i].getDownloadURL()  //URL取得

            let meta_task = await res.items[i].getMetadata();
            let customMetadata = meta_task.customMetadata  //カスタムメタデータ
            // console.log(customMetadata);
                    
            if(customMetadata != undefined){  //カスタムメタデータがある時
                let customMetadataDate = meta_task.customMetadata.date  //カスタムで作ったdateというメタデータ
                // console.log(customMetadataDate);

                if( customMetadataDate === shiainohi ){  //dateがダウンロードしたい日付と一致した時に
                    let url = await res_items_url;
                    let a = document.createElement('a'); //aタグを新規作成
                    a.href = url;  //aタグのリンク先にurlをセット
                    ElementSetTextContent(a,namae); //宣言した関数ElementSetTextContent()はテキストをハイパーリンク化するための関数
                    document.getElementById("k").appendChild(a);  //index.htmlのid=kのdivタグにaタグをセット
                }
            };

            // ダウンロードの進捗を示すプログレスバーを動かす
            let bar = document.getElementById("DLProgress");
            bar.max = itemslength
            bar.value = i+1


            // ダウンロードの完了を表示
            if(i===itemslength-1){
                document.getElementById("end").append("ファイルはこれで全てです");
                }
        };                        
    };


        // テキストをハイパーリンク化するための関数（こちら参照：https://hakuhin.jp/js/anchor.html#ANCHOR_ATTACH_ELEMENT）
        function ElementSetTextContent(element,str){
            if(element.textContent !== undefined)
            {
                element.textContent = str;
            }
            if(element.innerText !== undefined)
            {
                element.innerText = str;
            }
        };
