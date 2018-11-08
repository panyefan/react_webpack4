import { observable, action } from 'mobx';
import qs from 'qs';

class providerList {
    @observable loading = false;
    @observable providerList = [];
    @observable search = {};
    @observable currentPage = 1;
    @observable pageSize = 15;
    @observable totalRecords = 0;
    @observable examineStatusData = [];
    @observable statusData = [];


    @action onPageChange = (pageNumber, pageSize) => {      //分页组件得回调函数
        this.currentPage = pageNumber;
        this.pageSize = pageSize;
        this.loadList();
        this.showTotalRecord();
    }

    @action loadList = () => {                        //初始化列表数据
        let search = this.search;
        search.pageSize = this.pageSize
        search.currentPage = this.currentPage;
        this.loading = true;
        request.post(SC.baseUrl + '/cms/base/service/provider/list', qs.stringify(search)).then(response => {
            let page = response.data.data;
            let _servicesPs = [];
            if (page && page.data && page.data.length > 0) {
                let servicesProviders = page.data;
                for (let i in servicesProviders) {
                    servicesProviders[i].status = servicesProviders[i].enabled === 1 ? '启用' : '停用';
                    servicesProviders[i].mchExamineFlag = servicesProviders[i].mchExamineFlag ? '需要' : '不需要'
                    servicesProviders[i].key = i;
                    this.formatStatus(servicesProviders[i]);
                    _servicesPs.push(servicesProviders[i]);
                }
            }
            this.loading = false;
            this.providerList = _servicesPs;
        }, err => {
            this.providerList = [];
            this.loading = false;
            // reject(err);
        }).catch((error) => {
            this.providerList = [];
            this.loading = false;
            // reject(error)
        });
    }

    @action showTotalRecord = () => {               //获取页面的数据
        console.log("test mobx function");
    }

    @action changeSearch = (key, value) => {
        if (value === null) {
            delete this.search[key]
        } else {
            this.search[key] = value;
        }
    }

    @action cleanPageData = () => {
        this.currentPage = 1;
    }

    @action cleanSearch = () => {
        this.search = {};
        this.providerList = [];
    }

    // 匹配省运营状态
    @action formatStatus = (item) => {
        let arr = []
        item.loginFlag === false ? arr.push('冻结登录') : null;
        item.addMerchantFlag === false ? arr.push('冻结进件') : null;
        item.tradeFlag === false ? arr.push('冻结交易') : null;

        if (arr.length > 0) {
            item.statusCnt = arr.join('；');
        } else {
            item.statusCnt = '正常';
        }
    }
}

export default providerList;
