export const TestMenus = [{
	"funcId": 2,
	"appId": 2,
	"funcCode": "INDEX",
	"funcName": "企业信息",
	"funcUrl": "/index",
	"parentFunc": 0,
	"ordered": 99999,
	"menuFlag": true,
	"remark": "企业信息",
	"permissions": [{
		"funcId": 2,
		"permissionCode": "QUERY",
		"permissionName": "查询",
		"remark": ""
	}],
	"subs": [{
		"funcId": 2,
		"appId": 2,
		"funcCode": "INDEX",
		"funcName": "首页",
		"funcUrl": "/index",
		"parentFunc": 0,
		"ordered": 99999,
		"menuFlag": true,
		"remark": "服务商概览"
	}],
	"isSingle": true
},
{
	"funcId": 15,
	"appId": 2,
	"funcCode": "SALESMAN-MENU",
	"funcName": "资金预存",
	"funcUrl": "",
	"parentFunc": 0,
	"ordered": 99970,
	"menuFlag": true,
	"remark": "资金预存",
	"permissions": [],
	"subs": [],
	"isSingle": false
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
	"funcUrl": "/issueWelfare",
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
	"funcName": "对账统计",
	"funcUrl": "",
	"parentFunc": 0,
	"ordered": 99600,
	"menuFlag": true,
	"remark": "对账统计",
	"permissions": [],
	"subs": [{
		"funcId": 23,
		"appId": 2,
		"funcCode": "STORE-LIST",
		"funcName": "门店列表",
		"funcUrl": "/store-list",
		"parentFunc": 22,
		"ordered": 99999,
		"menuFlag": true,
		"remark": "门店列表",
		"permissions": [{
			"funcId": 23,
			"permissionCode": "ADD",
			"permissionName": "新增",
			"remark": ""
		},
		{
			"funcId": 23,
			"permissionCode": "QUERY",
			"permissionName": "查询"
		},
		{
			"funcId": 23,
			"permissionCode": "UPDATE",
			"permissionName": "编辑",
			"remark": ""
		},
		{
			"funcId": 23,
			"permissionCode": "EXPORT",
			"permissionName": "导出数据"
		}]
	}],
	"isSingle": false
},
{
	"funcId": 32,
	"appId": 2,
	"funcCode": "TRADE-MENU",
	"funcName": "订单流水",
	"funcUrl": "",
	"parentFunc": 0,
	"ordered": 99500,
	"menuFlag": true,
	"remark": "订单流水",
	"permissions": [],
	"subs": [{
		"funcId": 33,
		"appId": 2,
		"funcCode": "TRADE-LIST",
		"funcName": "交易明细",
		"funcUrl": "/transaction-list",
		"parentFunc": 32,
		"ordered": 99999,
		"menuFlag": true,
		"remark": "交易明细",
		"permissions": [{
			"funcId": 33,
			"permissionCode": "QUERY",
			"permissionName": "查询"
		},
		{
			"funcId": 33,
			"permissionCode": "EXPORT",
			"permissionName": "导出数据"
		}]
	}],
	"isSingle": false
}
];