export const TestMenus = [
	{
		"funcId": 15,
		"appId": 2,
		"funcCode": "SALESMAN-MENU",
		"funcName": "首页",
		"funcUrl": "",
		"parentFunc": 0,
		"ordered": 99970,
		"menuFlag": true,
		"remark": "首页",
		"permissions": [],
		"subs": [],
		"isSingle": true
	},
	{
		"funcId": 9,
		"appId": 2,
		"funcCode": "MERCHANT-MENU",
		"funcName": "员工管理",
		"funcUrl": "/userManage",
		"parentFunc": 0,
		"ordered": 99800,
		"menuFlag": true,
		"remark": "员工管理",
		"permissions": [],
		"subs": [],
		"isSingle": true
	},
	{
		"funcId": 418,
		"appId": 2,
		"funcCode": "EQUIPMENT-MENU",
		"funcName": "发放福利",
		"funcUrl": "/issueWelfare-list",
		"parentFunc": 0,
		"ordered": 99700,
		"menuFlag": true,
		"remark": "发放福利",
		"permissions": [],
		"subs": [],
		"isSingle": true
	},
	{
		"funcId": 22,
		"appId": 2,
		"funcCode": "STORE-MENU",
		"funcName": "发放管理",
		"funcUrl": "",
		"parentFunc": 0,
		"ordered": 99600,
		"menuFlag": true,
		"remark": "发放管理",
		"permissions": [],
		"subs": [{
			"funcId": 23,
			"appId": 2,
			"funcCode": "STORE-LIST",
			"funcName": "卡面配置",
			"funcUrl": "/cardConfig",
			"parentFunc": 22,
			"ordered": 99999,
			"menuFlag": true,
			"remark": "卡面配置",
			"permissions": []
		},
		{
			"funcId": 24,
			"appId": 3,
			"funcCode": "STORE-LIST",
			"funcName": "福利管理",
			"funcUrl": "/welfareCar-list",
			"parentFunc": 22,
			"ordered": 99999,
			"menuFlag": true,
			"remark": "福利管理",
			"permissions": []
		}],
		"isSingle": false
	}
];