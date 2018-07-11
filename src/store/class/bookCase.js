import Vue from 'vue'
import {bookSmallType} from '../../api/data'


export function BookCase() {
	/**
	 * 是否访问过api
	 * @type {number}
	 */
	this.getBookCase = 0;
	this.getBookBigType = 0;
	this.getBookSmallTypeAll = 0;

	/**
	 * 书籍总量
	 * @type {number}
	 */
	this.num = 0;

	/**
	 * 筛选标签
	 */
	this.saixuanChoosed = -1;

	/**
	 * 书籍状态
	 */
	this.bookState = [  //状态
		{name: '连载', num: 0, Id: -2},
		{name: '完本', num: 0, Id: -3},
		{name: '超过50章未读', num: 0, Id: -4},
		{name: '超过100章未读', num: 0, Id: -5},
		{name: '未读过', num: 0, Id: -6},
		{name: '读完', num: 0, Id: -7},
	];


	/**
	 * 书籍类型
	 * @type {[null,null,null,null,null]}
	 */
	this.bookTypeDivide = [ //类型区分
		{name: '男生', num: 0, Id: '11', subType: bookSmallType('11').data.CategoryInfoPageList,},
		{name: '女生', num: 0, Id: '12', subType: bookSmallType('12').data.CategoryInfoPageList},
		{name: '听书', num: 0, Id: '80001', subType: bookSmallType('80001').data.CategoryInfoPageList},
		{name: '漫画', num: 0, Id: '50001', subType: bookSmallType('50001').data.CategoryInfoPageList},
		{name: '出版', num: 0, Id: '4', subType: bookSmallType('4').data.CategoryInfoPageList},
	];

	/**
	 * 书籍列表
	 * @type {{}}
	 */
	this.bookcase = {};

	/**
	 * 添加书籍
	 * @param bookInfo
	 */
	this.addBook = (bookInfo) => {
		let key = 'book' + bookInfo.BookId;
		let categoryId = bookInfo.CategoryId;
		let subCategoryId = bookInfo.SubCategoryId;
		let bigType = 0;
		let isOver = -2;

		this.bookTypeDivide.forEach((val, key) => {
			val.subType.forEach((value, index) => {
				if (categoryId == value.CategoryId) {

					bigType = val.Id;

					this.bookTypeDivide[key].num++;
					this.bookTypeDivide[key].subType[index].num = this.bookTypeDivide[key].subType[index].num + 1 || 1;

					if (bookInfo.BookStatus == '完本') {
						this.bookState[1].num++;
						isOver = -3;
					}

					if (bookInfo.BookStatus == '连载') {
						this.bookState[0].num++;
						isOver = -2;
					}
				}
			})
		});
		Vue.set(this.bookcase, key, {
			bookInfo: bookInfo,
			isRead: 0,
			bookCaptia: [],
			readCap: 0,
			allCap: 0,
			bigType: bigType,
			isOver: isOver
		});
	};

	/**
	 * 删除数据
	 * @param bookId
	 */
	this.deleteBook = (bookId) => {

	};

	/**
	 * 刷新书籍
	 */
	this.reflush = () => {

	};

	/**
	 * 获取书籍列表 带筛选功能
	 * @returns {Array}
	 */
	this.getMyBookCase = () => {
		let array = [];
		Object.keys(this.bookcase).forEach((key) => {
			if (this.saixuanChoosed == -1) {  //全部
				array.push(this.bookcase[key]);
			} else if ([-2, -3].indexOf(Math.round(this.saixuanChoosed)) !== -1 && this.saixuanChoosed == this.bookcase[key].isOver) { //状态
				array.push(this.bookcase[key]);
			} else if ([4, 11, 12, 50001, 80001].indexOf(Math.round(this.saixuanChoosed)) !== -1 && this.saixuanChoosed == this.bookcase[key].bigType) { //大类别
				array.push(this.bookcase[key]);
			} else {  //小类别
				if (this.bookcase[key].bookInfo.CategoryId == this.saixuanChoosed) {
					array.push(this.bookcase[key]);
				}
			}
		});
		return array;
	};

	this.getBookGrepName = (name) => {
		let array = [];
		Object.keys(this.bookcase).forEach((key) => {
			if (this.bookcase[key].bookInfo.BookName.indexOf(name) != -1) {
				array.push(this.bookcase[key].bookInfo);
			}
		})
		return array;
	}
}

/**
 *
 * 获取书籍经验
 * https://mage.if.qidian.com/Atom.axd/Api/Book/GetNonAnonyEx post
 * bookId	1011486666  gender	0
 * {
	"BookId": 1011486666,
	"BookName": "大医凌然",
	"UserId": 188378520,
	"NickName": "荒芜剑",
	"RealImageUrl": "https://me.qidian.com/Images/UserImages/100x100/1.jpg",
	"Amount": 0,
	"FansLevel": 0,
	"RankName": "见习",
	"FansRank": 0,
	"UpgradeExp": 500,
	"UpgradeDesc": "再获得500粉丝值升级为\"学徒\"",
	"UpgradeName": "学徒",
	"IsBookAutoBuy": 0,
	"Result": 0,
	"Message": "成功"
}
 */

/**
 * 获取书籍详情
 * URL	https://mage.if.qidian.com/Atom.axd/Api/Book/GetNonAnony post
 * bookId	1011486666
 *{
	"MonthTicket": 0,
	"TicketAvailableMain": 1,
	"TicketAvallableMM": 1,
	"TicketAvallableWX": 1,
	"BookId": 1011486666,
	"BookName": "大医凌然",
	"AuthorId": 4362633,
	"Author": "志鸟村",
	"ChannelId": 3,
	"ChannelName": "都市·职场",
	"CategoryId": 4,
	"CategoryName": "都市",
	"FreeType": 1,
	"ImageStatus": 1,
	"IsVip": 1,
	"BookStatus": "连载",
	"EnableBookUnitLease": 0,
	"EnableBookUnitBuy": 0,
	"RecommendList": [{
		"BookId": 1012284778,
		"BookName": "魔武地球",
		"AuthorId": 7043531,
		"AuthorName": "",
		"Author": "娱记",
		"CategoryId": 4,
		"CategoryName": "都市",
		"ImageStatus": 0,
		"LastUpdateChapterID": 416267330,
		"LastUpdateChapterName": "第0061章 心情不美丽",
		"LastChapterUpdateTime": 1531191600000,
		"LastVipUpdateChapterId": 0,
		"LastVipUpdateChapterName": "",
		"LastVipChapterUpdateTime": 0,
		"IsVip": 0,
		"BookStatus": "连载",
		"WordsCount": 130843,
		"Label": null,
		"IsQin": 0,
		"BssReadTotal": 117628,
		"BssRecomTotal": 5010,
		"Price": null,
		"NewPrice": null,
		"Recommendation": null,
		"RecommenId": 0,
		"GroupName": "同类佳作",
		"ReadingType": 4,
		"AlgInfo": "",
		"PartCount": 0,
		"SourceBookId": 0,
		"BookPartInfo": null,
		"ChargeType": 0,
		"TotalPrice": 0,
		"WholeSale": 0,
		"IsJingPai": 0,
		"IsPublication": 0,
		"FreeType": 0,
		"BookType": 0,
		"EnableBookUnitLease": 0,
		"EnableBookUnitBuy": 0,
		"GroupId": 21,
		"OrderIdEx": 1,
		"IsShowCover": 1,
		"BookIntro": null,
		"Description": "“如果可以扭转时间，你最想回到什么时候？”穿越魔武地球，陆威十年挣扎，掌握时间超能，终于一飞冲天。魔兽横行的世界，武术、魔法、超能，究竟谁主巅峰。书群：781464504"
	}, {
		"BookId": 1011874986,
		"BookName": "数字王国",
		"AuthorId": 402320761,
		"AuthorName": "",
		"Author": "大西瓜真甜",
		"CategoryId": 4,
		"CategoryName": "都市",
		"ImageStatus": 0,
		"LastUpdateChapterID": 417566781,
		"LastUpdateChapterName": "112试探2",
		"LastChapterUpdateTime": 1531184100000,
		"LastVipUpdateChapterId": 0,
		"LastVipUpdateChapterName": "",
		"LastVipChapterUpdateTime": 0,
		"IsVip": 0,
		"BookStatus": "连载",
		"WordsCount": 268234,
		"Label": null,
		"IsQin": 0,
		"BssReadTotal": 251509,
		"BssRecomTotal": 5301,
		"Price": null,
		"NewPrice": null,
		"Recommendation": null,
		"RecommenId": 0,
		"GroupName": "同类佳作",
		"ReadingType": 4,
		"AlgInfo": "",
		"PartCount": 0,
		"SourceBookId": 0,
		"BookPartInfo": null,
		"ChargeType": 0,
		"TotalPrice": 0,
		"WholeSale": 0,
		"IsJingPai": 0,
		"IsPublication": 0,
		"FreeType": 0,
		"BookType": 0,
		"EnableBookUnitLease": 0,
		"EnableBookUnitBuy": 0,
		"GroupId": 21,
		"OrderIdEx": 1,
		"IsShowCover": 1,
		"BookIntro": null,
		"Description": "一个普通的大学生得到一个人工智能，能走多远，财富，权势，美色究竟什么才是他想要的，虚拟游戏，人工智能，"
	}, {
		"BookId": 3223937,
		"BookName": "神话版三国",
		"AuthorId": 2773217,
		"AuthorName": "",
		"Author": "坟土荒草",
		"CategoryId": 5,
		"CategoryName": "历史",
		"ImageStatus": 1,
		"LastUpdateChapterID": 0,
		"LastUpdateChapterName": "",
		"LastChapterUpdateTime": 0,
		"LastVipUpdateChapterId": 418686911,
		"LastVipUpdateChapterName": "第两千八百二十四章 瞻仰本侯的伟岸吧",
		"LastVipChapterUpdateTime": 1531180990000,
		"IsVip": 1,
		"BookStatus": "连载",
		"WordsCount": 7605035,
		"Label": null,
		"IsQin": 0,
		"BssReadTotal": 26785367,
		"BssRecomTotal": 359768,
		"Price": null,
		"NewPrice": null,
		"Recommendation": null,
		"RecommenId": 0,
		"GroupName": "本月最热",
		"ReadingType": 5,
		"AlgInfo": "",
		"PartCount": 0,
		"SourceBookId": 0,
		"BookPartInfo": null,
		"ChargeType": 0,
		"TotalPrice": 0,
		"WholeSale": 0,
		"IsJingPai": 0,
		"IsPublication": 0,
		"FreeType": 0,
		"BookType": 0,
		"EnableBookUnitLease": 0,
		"EnableBookUnitBuy": 0,
		"GroupId": 22,
		"OrderIdEx": 1,
		"IsShowCover": 1,
		"BookIntro": null,
		"Description": "陈曦看着将一块数百斤巨石撇出去的士卒，无语望苍天，这真的是东汉末年？吕布单枪匹马凿穿万人部队，这怎么看都不科学。赵子龙真心龙魂附体了，一剑断山，这真的是人？典韦单人护着曹操杀出敌营，顺手宰了对面数千步骑，这战斗力爆表了吧！这是不是哪里有些不对啊，陈曦顺手摸了一把鹅毛扇挥了一下，狂风大作，叹了一口气，“这是神话吧，我自己都不正常了。”ps：其实这是一篇正经的种田文……QQ群：95010223（主群，现在还有空位）全订QQ群：375380021酱油群：397441818二群：418928396"
	}, {
		"BookId": 1009704712,
		"BookName": "牧神记",
		"AuthorId": 4362125,
		"AuthorName": "",
		"Author": "宅猪",
		"CategoryId": 21,
		"CategoryName": "玄幻",
		"ImageStatus": 1,
		"LastUpdateChapterID": 0,
		"LastUpdateChapterName": "",
		"LastChapterUpdateTime": 0,
		"LastVipUpdateChapterId": 418702107,
		"LastVipUpdateChapterName": "第八百一十五章 花非花雾非雾",
		"LastVipChapterUpdateTime": 1531194806000,
		"IsVip": 1,
		"BookStatus": "连载",
		"WordsCount": 2710641,
		"Label": null,
		"IsQin": 0,
		"BssReadTotal": 84083107,
		"BssRecomTotal": 1228677,
		"Price": null,
		"NewPrice": null,
		"Recommendation": null,
		"RecommenId": 0,
		"GroupName": "本月最热",
		"ReadingType": 5,
		"AlgInfo": "",
		"PartCount": 0,
		"SourceBookId": 0,
		"BookPartInfo": null,
		"ChargeType": 0,
		"TotalPrice": 0,
		"WholeSale": 0,
		"IsJingPai": 0,
		"IsPublication": 0,
		"FreeType": 0,
		"BookType": 0,
		"EnableBookUnitLease": 0,
		"EnableBookUnitBuy": 0,
		"GroupId": 22,
		"OrderIdEx": 1,
		"IsShowCover": 1,
		"BookIntro": null,
		"Description": "大墟的祖训说，天黑，别出门。大墟残老村的老弱病残们从江边捡到了一个婴儿，取名秦牧，含辛茹苦将他养大。这一天夜幕降临，黑暗笼罩大墟，秦牧走出了家门……做个春风中荡漾的反派吧！瞎子对他说。秦牧的反派之路，正在崛起！书友群：600290060，624672265，VIP群：663057414（有验证）普通群：424940671"
	}, {
		"BookId": 1012284524,
		"BookName": "星空之主",
		"AuthorId": 3862340,
		"AuthorName": "",
		"Author": "八月飞鹰",
		"CategoryId": 21,
		"CategoryName": "玄幻",
		"ImageStatus": 1,
		"LastUpdateChapterID": 418677803,
		"LastUpdateChapterName": "62.左右开弓（3更求收藏！求推荐票！）",
		"LastChapterUpdateTime": 1531157925000,
		"LastVipUpdateChapterId": 0,
		"LastVipUpdateChapterName": "",
		"LastVipChapterUpdateTime": 0,
		"IsVip": 0,
		"BookStatus": "连载",
		"WordsCount": 137137,
		"Label": null,
		"IsQin": 0,
		"BssReadTotal": 1554754,
		"BssRecomTotal": 57396,
		"Price": null,
		"NewPrice": null,
		"Recommendation": null,
		"RecommenId": 0,
		"GroupName": "书荒新书",
		"ReadingType": 4,
		"AlgInfo": "",
		"PartCount": 0,
		"SourceBookId": 0,
		"BookPartInfo": null,
		"ChargeType": 0,
		"TotalPrice": 0,
		"WholeSale": 0,
		"IsJingPai": 0,
		"IsPublication": 0,
		"FreeType": 0,
		"BookType": 0,
		"EnableBookUnitLease": 0,
		"EnableBookUnitBuy": 0,
		"GroupId": 23,
		"OrderIdEx": 1,
		"IsShowCover": 1,
		"BookIntro": null,
		"Description": "新炎黄历八百年，世界早已告别古修真时代，步入现代。交流共赢，既竞争又合作是当前时代的主流。有一只宝葫炼万物，有大梦平生我先觉，有天生神人起凡尘……未知的道理，无尽的星空是所有修士共同的全新征途。一艘先进程度超越时代，却又来历神秘的彼岸神舟，载着少年沈健驶向宇宙大海航时代。新时代修真，未来在星空，乘风破浪会有时，直挂云帆济星海。"
	}, {
		"BookId": 1012437258,
		"BookName": "宿主脑阔疼",
		"AuthorId": 9006388,
		"AuthorName": "",
		"Author": "偷名",
		"CategoryId": 4,
		"CategoryName": "都市",
		"ImageStatus": 1,
		"LastUpdateChapterID": 418702684,
		"LastUpdateChapterName": "第16章 不好意思，接个电话",
		"LastChapterUpdateTime": 1531195539000,
		"LastVipUpdateChapterId": 0,
		"LastVipUpdateChapterName": "",
		"LastVipChapterUpdateTime": 0,
		"IsVip": 0,
		"BookStatus": "连载",
		"WordsCount": 32000,
		"Label": null,
		"IsQin": 0,
		"BssReadTotal": 139035,
		"BssRecomTotal": 55161,
		"Price": null,
		"NewPrice": null,
		"Recommendation": null,
		"RecommenId": 0,
		"GroupName": "书荒新书",
		"ReadingType": 4,
		"AlgInfo": "",
		"PartCount": 0,
		"SourceBookId": 0,
		"BookPartInfo": null,
		"ChargeType": 0,
		"TotalPrice": 0,
		"WholeSale": 0,
		"IsJingPai": 0,
		"IsPublication": 0,
		"FreeType": 0,
		"BookType": 0,
		"EnableBookUnitLease": 0,
		"EnableBookUnitBuy": 0,
		"GroupId": 23,
		"OrderIdEx": 1,
		"IsShowCover": 1,
		"BookIntro": null,
		"Description": "传说中，一上来就威胁如果解绑就要剁了宿主的叼证道的系统神秘现身，宿主脑阔疼……已有完本高订2万的老书《神豪无极限》。群：252758277，欢迎大家。"
	}],
	"IsBookUpdateNotice": 0,
	"IsBookAutoBuy": 0,
	"RelatedBooks": null,
	"EnableVoteMonth": 1,
	"EnableDonate": 1,
	"Result": 0,
	"Message": "成功"
}
 *
 */


/**
 * 获取书籍折扣
 * https://mage.if.qidian.com/Atom.axd/Api/Book/GetBookDiscount
 * bookid	1011486666 isFreeUser	0  post
 * {
	"BookId": 1011486666,
	"ReadingInfo": {
		"WordsPriceTips": "5分/千字",
		"DefaultWordsPriceTips": "5分/千字",
		"ReadingType": 5,
		"BookUnit": {
			"Text": "",
			"LittleText": "",
			"EnableBookUnitLease": 0,
			"EnableBookUnitBuy": 0,
			"UnitCount": "0",
			"UnitBuyCount": 0,
			"WholePrice": 0
		},
		"FavourableInfo": null,
		"FreeReadingSimple": null,
		"FreshManSimple": null
	},
	"Result": 0,
	"Message": "成功"
}
 */


/**
 * 获取书籍对应书单
 * https://mage.if.qidian.com/Atom.axd/Api/BookList/GetRelation
 * bookid 1011486666 isRecommended 1 post
 page	1
 size	3
 type	2
 {
	"count": 373,
	"Result": 0,
	"Message": "",
	"Data": [{
		"id": 253399,
		"name": "主推幼苗的长评书单，求收藏书单求关注啊",
		"des": "我删广告，不过有兴趣的基本会试毒，另外不帮点评，不要强求，谢谢。\n\nps：一星剧毒、二星毒草、三星干草、四星粮草、五星仙草，+和-上下浮动。\n\n最后，求关注，最近新增关注（新版点击书单最下方中间的那个...",
		"collectCount": 36755,
		"bookCount": 80,
		"authorId": 107494461,
		"authorName": "杨辰空",
		"authorHeadImg": "https://qidian.qpic.cn/qd_face/349573/5734766/100",
		"bookListTypeId": 4,
		"bookListType": "幼苗养殖",
		"bookIntroWords": "明天七一上架，有能力的支持下作者啊，哪怕是首订\n\n志鸟村的医生文新书。\r\n\r\n系统流医生文。在即将前往本市最好医院云华医院实习之前，医学院校草凌然突然发现自己获得了一个系统，然而他跟其他主角不一样，这货的第一反应居然是给自己做个精神病测试，有够搞得……系统开场就给主角送了个大师级对接缝合术大礼包，直接让他在实习生中鹤立鸡群被医教科主任另眼相看。为了刷经验完成任务主动要求去急诊科，依靠新手大礼包成了缝合方面的主力，目前依靠刷任务刷出了大师级TANG缝合法，得到了顶头上司急诊科霍主任的器重。目前刚刷出了3000次解剖上肢的经验奖励，刚刚狠狠装完一波。\r\n\r\n为什么看这书：志鸟村作为很有资历和人气的老作者，文笔自然不用说的，而且作为喜剧色彩很浓的小说，写的很成功，用各种俏皮话、男神梗将故事衬托的笑料满满，将医院里面本该枯燥的剧情也写的很有意思。志鸟村这个作者的小说有两大特色，其中之一就是装逼，不得不说他写的装逼打脸剧情真的很好，这本里面除了少数打脸找错对象的剧情，不需要读者放弃脑子来阅读却有看的很爽。话说作者在找资料方面狠下功夫啊，写什么像什么，上本学霸这本医生都写的像那么回事，当然这说的是在我们外行人眼里。在内行人眼里肯定是槽点多多了……\r\n\r\n为什么不看这书：首先就是上文中说到的打脸找错对象的剧情，不得不说在那段剧情里我更支持被打脸的上级；其次嘛，就是志鸟村这个作者的另一大特色——水了，听他外号叫水豚就明白了，中后期各种汪洋大海，但是吧，他水文的技巧不错，不至于水到看的人恶心，有时候甚至看得人挺舒服的，这也是老作者功力的体现吧。\r\n\r\n总体来说我感觉是粮草吧，后续看情况改评。",
		"imgUrls": [{
			"imgUrl": 1011924365
		}, {
			"imgUrl": 1011452759
		}, {
			"imgUrl": 1010400217
		}]
	}, {
		"id": 231872,
		"name": "♝记忆中的粮草与仙草，完本与幼苗皆有\uD83C\uDF76\uD83C\uDF76\uD83C\uDF76",
		"des": "这里是狼王，书单都是记忆里喜欢和追读过的一些书，基本都是全订\n\n当初也是看盗版的，自从2007年开始，正式转起点看正版，支持喜欢的作者们\n到了现在正好十年，前前后后用过十几个号，大多已经晋升高v，当然...",
		"collectCount": 19034,
		"bookCount": 100,
		"authorId": 899214,
		"authorName": "狼王之祖",
		"authorHeadImg": "https://qidian.qpic.cn/qd_face/349573/4051102/100",
		"bookListTypeId": 1,
		"bookListType": "大道至简",
		"bookIntroWords": "水豚新书，截止目前为止，我依旧认为，他的重生之神级学霸是最好的学霸文，不论是立意还是高度上，都并非现在的基本热门学霸文可比。\n\n目前只有三章，但很对胃口，主角是一个冷静的医学院校草，在得到系统后，冷静思索下来做的第一件事，居然是给自己做了一个精神病测试……\n\n已经可以看出，这会是一个和上本一样，精通高级装逼术的佳作，",
		"imgUrls": [{
			"imgUrl": 1012341972
		}, {
			"imgUrl": 1010633888
		}, {
			"imgUrl": 1010868264
		}]
	}, {
		"id": 299957,
		"name": "神书幼苗\uD83D\uDD25完本精品\uD83D\uDD25脑洞奇文\uD83D\uDD25冷门仙草\uD83D\uDD25",
		"des": "1.（准备搞个优质作者系列，初步安排香蕉，江南，远瞳，乌贼，三渣，二目，词猫，宅猪，七月，九鱼，大家还有推荐吗）\n2.【特别注意】同志们，一定要收藏书单，点屏幕下方的小五角星\uD83C\uDF1F，把它点成红色的星星就...",
		"collectCount": 18206,
		"bookCount": 80,
		"authorId": 175208388,
		"authorName": "chaizixian04",
		"authorHeadImg": "https://qidian.qpic.cn/qd_face/349573/3977221/100",
		"bookListTypeId": 4,
		"bookListType": "三观要正",
		"bookIntroWords": "2018年5月17日加入书单，一月内点赞过500永久保留。830点赞置顶，下次点赞840\n归类【神书幼苗】重生之神级学霸的作者的新书。《学霸》写的非常好，一直想加入书单来着。但还没看完，以后有机会再加吧。\n因为这本书刚开本，也不好点评。\n先重点谈谈这位作者吧。\n跟许多首作巅峰，灵感耗尽，江郎才尽的作者不同，志鸟村每本书都能有大幅的进步。\n十多年的打磨，写作技巧越来娴熟。\n就拿这本书来说，前五章非常流畅，讲一个冷静过头的校草医学生突然得到系统，他会怎么办呢？\n正常来讲，作者一般采取的方式是让主角渐渐接受这件事——不管这事多操蛋，多不可思议。\n但在志鸟村笔下，他竟然让主角给自己做了一个精神病测试。然后对系统做图灵测试。\n这个开头真是触到了合理党的爽点。\n回到作者本人，他的作品向来都是细节详实，情节饱满，专业性知识像模像样。虽然写的是虚构的故事，但会让你有一种活生生的世界，或者真实发生过的感觉。\n不过缺点是，中后期总是免不了大水漫灌啊！",
		"imgUrls": [{
			"imgUrl": 1010868264
		}, {
			"imgUrl": 1012206755
		}, {
			"imgUrl": 1011784721
		}]
	}]
}
 */