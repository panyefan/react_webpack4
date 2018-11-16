// const IndustryData = [
//     {
//         id: '1',
//         name: '企业',
//         children: [{
//             id: '11',
//             name: '众筹',
//             children: [{
//                 id: '111',
//                 name: 'VR'
//             },{
//                 id: '112',
//                 name: '共享飞船'
//             }]
//         },{
//             id: '12',
//             name: '电商 / 团购',
//             children: [{
//                 id: '121',
//                 name: '线上商超'
//             },{
//                 id: '122',
//                 name: '海淘'
//             },{
//                 id: '123',
//                 name: '团购'
//             }]
//         }]
//     },{
//         id: '2',
//         name: '个体工商户',
//         children: [{
//             id: '21',
//             name: '房地产',
//             children: [{
//                 id: '211',
//                 name: '房产管理'
//             }]
//         }]
//     }
// ];

// var allData = [{
//     parentIndustry: '0',
//     industryId: '1',
//     industryName: '广东'
// }, {
//     parentIndustry: '55555555',
//     industryId: '55555551',
//     industryName: '我是一级'
// }, {
//     parentIndustry: '1',
//     industryId: '11',
//     industryName: '深圳'
// }, {
//     parentIndustry: '21',
//     industryId: '211',
//     industryName: '小莆田区'
// }, {
//     parentIndustry: '55555551',
//     industryId: '55555552',
//     industryName: '我是二级'
// }, {
//     parentIndustry: '020',
//     industryId: '2',
//     industryName: '福建'
// }, {
//     parentIndustry: '11',
//     industryId: '112',
//     industryName: '福田区'
// }, {
//     parentIndustry: '11',
//     industryId: '111',
//     industryName: '南山区'
// }, {
//     parentIndustry: '2',
//     industryId: '21',
//     industryName: '莆田'
// }, {
//     parentIndustry: '321321321',
//     industryId: '2321321321',
//     industryName: '不知道什么行业'
// }];

import allData from './allData.js';

const IndustryData = transformIndustryData(allData);

export default IndustryData;

function transformIndustryData(allData) {
    var level1 = [],
        level2 = [],
        level3 = [],
        finalData = [];

    setIndustryData(allData);

    // console.log('第一级', level1);
    // console.log('第二级', level2);
    // console.log('第三级', level3);

    setChildren(level3, level2, level1);

    // console.log('最终数据', finalData);

    function setIndustryData(theData, level) {
        level = level || 1;
        var len = theData.length;
        var theArr = theData.slice(0);
        var level_Arr = [];
        var level_index = [];

        for (var i = 0; i < len; i++) {
            var loop_count = 0;
            for (var j = 0; j < len; j++) {
                if ((theData[i].parentIndustry != theData[j].industryId) && (i != j)) { // 不是任何人的 children，即没有父级，即第一级
                    loop_count++;
                    if (loop_count == len - 1) {
                        level_Arr.push(theData[i]);
                        level_index.push(i);
                    }
                }
            }
        }

        var newArr = [];
        var counter = 0;
        for (var k = 0; k < level_index.length; k++) {
            newArr.push(theData[level_index[k]]);
            theArr.splice(level_index[k] - counter, 1);
            counter++;
        }

        if (level == 1) {
            level1 = newArr;
        } else if (level == 2) {
            level2 = newArr;
        } else if (level == 3) {
            level3 = newArr;
            return;
        }
        level++;
        setIndustryData(theArr, level);
    }

    function setChildren(childArr, parentArr, TopParentArr, level) {
        level = level || 2; // 2:把第三级组装到第二级   1:把第二级组装到第一级
        var newArr = [];
        for (var i = 0; i < parentArr.length; i++) {
            if (level == 2) {
                var obj = {
                    industryId: parentArr[i].industryId,
                    parentIndustry: parentArr[i].parentIndustry,
                    industryName: parentArr[i].industryName
                };
            } else if (level == 1) {
                var obj = {
                    id: parentArr[i].industryId,
                    name: parentArr[i].industryName
                };
            }
            // console.log(parentArr[i]);
            var loop_count = 0;
            for (var j = 0; j < childArr.length; j++) {
                if (parentArr[i].industryId == childArr[j].parentIndustry) {
                    var arr = [];
                    var o = {
                        id: childArr[j].industryId,
                        name: childArr[j].industryName
                    };
                    if (level == 1) {
                        o.children = childArr[j].children;
                        if (childArr[j].children) { // 第二级有子集
                            o.children = childArr[j].children;
                        } else { // 第二级没有子集
                            o.children = [{id: childArr[j].industryId, name: childArr[j].industryName}];
                        }
                    }
                    arr.push(o);
                    if (obj.children) {
                        obj.children = obj.children.concat(arr);
                    } else {
                        obj.children = arr;
                    }
                } else {
                    loop_count ++;
                    if(level == 1 && loop_count == childArr.length) { // 第一级没有任何子集
                        obj.children = [{
                            id: parentArr[i].industryId,
                            name: parentArr[i].industryName,
                            children: [{
                                id: parentArr[i].industryId,
                                name: parentArr[i].industryName
                            }]
                        }]
                    }
                }
            }
            newArr.push(obj);
        }
        if (TopParentArr) {
            setChildren(newArr, TopParentArr, undefined, 1);
        } else {
            finalData = newArr;
        }
    }

    return finalData;
}