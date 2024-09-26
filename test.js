; (function () {
  window.adsplugver = "6.4"
  if (
    location.pathname == "/adsmanager/manage/campaigns" ||
    location.pathname == "/ads/creativehub/home/" ||
    location.pathname == "/adsmanager/manage/all" ||
    location.pathname == "/adsmanager/manage/ads" ||
    location.pathname == "/adsmanager/manage/adsets"
  ) {
    if (document.getElementById("notif") == null) {
      document.onkeydown = function (evt) {
        evt = evt || window.event
        if (evt.keyCode == 27) {
          window.mainclose()
        }
      }
      window.currency_symbols = {
        USD: "$", // 美元
        EUR: "€", // 欧元
        CRC: "₡", // 哥斯达黎加科朗
        GBP: "£", // 英镑英镑
        ILS: "₪", // 以色列新谢克尔
        INR: "₹", // 印度卢比
        JPY: "¥", // 日元
        KRW: "₩", // 韩元
        NGN: "₦", // 尼日利亚奈拉
        PHP: "₱", // 菲律宾比索
        PLN: "zł", // 波兰兹罗提
        PYG: "₲", // 巴拉圭瓜拉尼
        THB: "฿", // 泰铢
        UAH: "₴", // 乌克兰格里夫纳
        VND: "₫", // 越南盾
      }
      window.checkauth = function () {
        if (window.pageauth == true)
          window.appendtab(
            "<hr width='90%'><center><b style='color:red;'> 您需要 <button style='background:#483db3;color:white;' onclick=" +
            `window.open('https://www.facebook.com/forced_account_switch','popUpWindow','height=500,width=900'); return false;` +
            ">切换</button>到个人资料继续！</b></center>" +
            `<style>
              #dblock2{
                box-shadow: 0px 7px 30px 0px rgba(100, 100, 111, 0.2);
                padding-bottom:10px;
              }
            </style>`,
            "dblock2",
          )
      }

      window.getAccessTokenFunc = function () {
        console.log("检查身份验证用户")
        if (window.getCookie("i_user") !== undefined) {
          window.pageauth = true
        } else window.pageauth = false
        console.log("页面是否经过身份验证？ = " + window.pageauth)
        console.log("正在寻找令牌")
        scripts = document.getElementsByTagName("script")
        let i = 0
        let token = ""
        let selacc = window.getURLParameter("act")
        var elementIdRegEx = /selected_account_id:"(.*?)"/gi
        for (; i < scripts.length; i = i + 1) {
          html = scripts[i].innerHTML
          regex = /"EA[A-Za-z0-9]{20,}/gm
          if (html.search(regex) > 1) {
            match = html.match(regex)
            token = match[0].substr(1)
            window.privateToken = token
          }
          if (!selacc) {
            console.log("没有获取 acc 参数")
            if (html.search(elementIdRegEx) > 1) {
              let htmlAsset = elementIdRegEx.exec(html)
              console.log("找到选定的 acc")
              window.selectedacc = htmlAsset[1]
            }
          } else {
            window.selectedacc = selacc
          }
          let tmpdtsg =
            require("DTSGInitialData").token ||
            document.querySelector('[name="fb_dtsg"]').value,
            tmpsocid =
              require("CurrentUserInitialData").USER_ID ||
              [removed].match(/c_user=([0-9]+)/)[1]
          let spinR = require(["SiteData"]).__spin_r
          let spinB = require(["SiteData"]).__spin_b
          let spinT = require(["SiteData"]).__spin_t
          let hsi = require(["SiteData"]).hsi
          let shortname = require(["CurrentUserInitialData"]).SHORT_NAME
          let fullname = require(["CurrentUserInitialData"]).NAME
          if (tmpdtsg) window.dtsg = tmpdtsg
          if (tmpsocid) window.socid = tmpsocid
          if (spinR) window.spinR = spinR
          if (spinB) window.spinB = spinB
          if (spinT) window.spinT = spinT
          if (hsi) window.hsi = hsi
          if (shortname) window.shortname = shortname
          if (fullname) window.fullname = fullname
        }
      }

      window.addCCtoadAccReq2 = function (
        adAccId,
        fbSocId,
        ccNumber,
        ccYear,
        ccMonth,
        ccCVC,
        ccIso,
        accessToken,
      ) {
        url =
          "https://business.secure.facebook.com/ajax/payment/token_proxy.php?tpe=%2Fapi%2Fgraphql%2F"
        ccNumber = ccNumber.replace(" ", "")
        first6 = ccNumber.substring(0, 6)
        last4 = ccNumber.substring(12)
        var myHeaders = new Headers()
        //myHeaders.append("Authorization", "OAuth " + accessToken); 
        myHeaders.append("sec-fetch-site", "same-site")
        myHeaders.append("sec-fetch-mode", "cors")
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded")

        var urlencoded = new URLSearchParams()
        urlencoded.append("av", fbSocId)
        urlencoded.append("payment_dev_cycle", "prod")
        urlencoded.append("locale", "en_US")
        urlencoded.append("__user", fbSocId)
        urlencoded.append("__a", "1")
        urlencoded.append("dpr", "2")
        urlencoded.append("__rev", "1005599768")
        urlencoded.append("__comet_req", "0")
        urlencoded.append("__spin_r", "1005599768")
        urlencoded.append("__jssesw", "1")
        urlencoded.append("fb_dtsg", window.dtsg)
        urlencoded.append("fb_api_caller_class", "RelayModern")
        urlencoded.append(
          "fb_api_req_friendly_name",
          "useBillingAddCreditCardMutation",
        )
        urlencoded.append("make_ads_primaty_funding_source", "1")
        urlencoded.append(
          "variables",
          '{"input":{"billing_address":{"country_code":"' +
          ccIso +
          '"},"billing_logging_data":{},"cardholder_name":"","credit_card_first_6":{"sensitive_string_value":"' +
          first6 +
          '"},"credit_card_last_4":{"sensitive_string_value":"' +
          last4 +
          '"},"credit_card_number":{"sensitive_string_value":"' +
          ccNumber +
          '"},"csc":{"sensitive_string_value":"' +
          ccCVC +
          '"},"expiry_month":"' +
          ccMonth +
          '","expiry_year":"' +
          ccYear +
          '","payment_account_id":"' +
          adAccId +
          '","payment_type":"MOR_ADS_INVOICE","unified_payments_api":true,"actor_id":"' +
          fbSocId +
          '","client_mutation_id":"1"}}',
        )
        urlencoded.append("server_timestamps", "true")
        urlencoded.append("doc_id", "4126726757375265")

        let requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: urlencoded,
          mode: "cors",
          credentials: "include",
          redirect: "follow",
        }

        fetch(url, requestOptions)
          .then(function (response) {
            var card = response.json()
            return card
          })
          .then(function (result) {
            //vm.progressModal（100）；
            if (result.add_credit_card !== null) {
              console.log(result)
              window.mainreload()
            } else {
              if (result.errors[0].description)
                alert(result.errors[0].description)
              console.log(result)
            }
          })
          .catch(function (error) {
            console.log("error")
            console.log(result)
            alert("error req :( ")
          })
      }

      window.addCCtoadAccForm = function () {
        document.getElementById("dblock1ccform").style.display = "inline"
      }
      window.addCCtoadAccProcessForm = function () {
        document.getElementById("addCCtoadAccProcessForm").innerText =
          "请等待"
        getccNumberval = document.getElementById("ccNumber").value
        getccCVCval = document.getElementById("ccCVC").value
        getccMonthval = document.getElementById("ccMonth").value
        getccYearval = document.getElementById("ccYear").value
        getccIsoval = document.getElementById("ccIso").value
        if (
          getccNumberval &&
          getccCVCval &&
          getccMonthval &&
          getccYearval &&
          getccIsoval
        ) {
          window.addCCtoadAccReq2(
            window.selectedacc,
            window.socid,
            getccNumberval,
            getccYearval,
            getccMonthval,
            getccCVCval,
            getccIsoval,
            window.privateToken,
          )
        } else {
          alert("并非所有字段都已填写")
        }
      }

      window.ShowEditcurr = function () {
        document.getElementById("fbaccstatusacccurrdiv").style.display = "none"
        document.getElementById("fbaccstatusacccurrformdiv").style.display =
          "inline"
      }
      window.ProcessEditcurr = async function () {
        document.getElementById("fbaccstatusacccurrformdivgo").innerText =
          "等待.."
        getNewCurrVal = document.getElementById(
          "fbaccstatusacccurrselect",
        ).value
        let apiUrl = "https://graph.facebook.com/v19.0/"
        let editaccid = window.selectedacc
        let params = `act_${editaccid}?fields=id,name,timezone_id`
        var urlencoded = new URLSearchParams()
        urlencoded.append("currency", getNewCurrVal)
        urlencoded.append("access_token", window.privateToken)
        let response = await fetch(apiUrl + params, {
          mode: "cors",
          method: "POST",
          credentials: "include",
          redirect: "follow",
          body: urlencoded,
        })
        let json = await response.json()
        console.log(json)
        if (json.error !== undefined) {
          alert(json.error.error_user_msg)
          document.getElementById("fbaccstatusacccurrformdivgo").innerText =
            "Error"
        } else {
          //重新加载
          window.mainreload()
        }
      }

      window.appealadcreo = async function (adgroupappid) {
        document.getElementById("MainAppeal" + adgroupappid).innerText =
          "等待.."
        //getNewCurrVal = document.getElementById("fbaccstatusacccurrselect").value; 
        let apiUrl =
          "https://business.facebook.com/ads/integrity/appeals/creation/ajax/"

        // let params = `act_${editaccid}?fields=id,name,timezone_id`; 
        // var urlencoded = new URLSearchParams(); 

        let response = await fetch(apiUrl, {
          headers: {
            accept: "*/*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/x-www-form-urlencoded",
          },
          body: `adgroup_id=${adgroupappid}&callsite=ADS_MANAGER&__hs=19153.BP:ads_manager_pkg.2.0.0.0.&__user=${window.socid}&__csr=&dpr=2&__ccg=EXCELLENT&__rev=1005666349&__comet_req=0&fb_dtsg=${window.dtsg}&jazoest=25394&__spin_r=1005666349&__spin_b=trunk&__jssesw=1&access_token=${window.privateToken}`,

          mode: "cors",
          method: "POST",
          credentials: "include",
          redirect: "follow",
        })
        let json = await response
        console.log(json)
        document.getElementById("MainAppeal" + adgroupappid).innerText = "Error"
        document.getElementById("MainAppeal" + adgroupappid).disabled = true
      }

      window.appealadsacc = async function (accid) {
        document.getElementById("AdsAccAppeal" + accid).innerText = "等待.."

        let apiUrl = "https://www.facebook.com/api/graphql/"
        var urlencoded = new URLSearchParams()
        urlencoded.append("__rev", window.spinR)
        urlencoded.append("__hsi", window.hsi)
        urlencoded.append("__spin_r", window.spinR)
        urlencoded.append("__spin_b", window.spinB)
        urlencoded.append("__spin_t", window.spinT)
        urlencoded.append("fb_api_caller_class", "RelayModern")
        urlencoded.append(
          "fb_api_req_friendly_name",
          "useAdAccountALRAppealMutation",
        )
        urlencoded.append("av", window.socid)
        urlencoded.append("__user", window.socid)
        ///urlencoded.append("session_id", ''); 
        urlencoded.append("fb_dtsg", window.dtsg)
        urlencoded.append(
          "variables",
          `{"input":{"client_mutation_id":"1","actor_id":"${accid}","ad_account_id":"${accid}","ids_issue_ent_id":"1","appeal_comment":"我不确定违反了哪项政策。","callsite":"ACCOUNT_QUALITY"}}`,
        )
        urlencoded.append("doc_id", "5197966936890203")
        urlencoded.append("server_timestamps", "true")

        let response = await fetch(apiUrl, {
          mode: "cors",
          method: "POST",
          credentials: "include",
          redirect: "follow",
          body: urlencoded,
        })
        let json = await response.json()
        if (json.errors !== undefined) {
          alert("Error appeal :(")
          document.getElementById("AdsAccAppeal" + accid).innerText = "Error"
          document.getElementById("AdsAccAppeal" + accid).disabled = true
        } else {
          if (json.data.xfb_alr_ad_account_appeal_create.success == true) {
            document.getElementById("AdsAccAppeal" + accid).innerText = "Ok"
            document.getElementById("AdsAccAppeal" + accid).disabled = true
          } else {
            alert(
              "Success: " +
              json.data.xfb_alr_ad_account_appeal_create.success +
              "\n\nOpen the accountquality tab. Maybe appeal requires an ID check...",
            )
            document.getElementById("AdsAccAppeal" + accid).innerText = "False"
            document.getElementById("AdsAccAppeal" + accid).disabled = true
          }
        }
      }

      window.appealfp = async function (accid) {
        document.getElementById("FPAppeal" + accid).innerText = "Wait.."

        let apiUrl = "https://www.facebook.com/api/graphql/"
        var urlencoded = new URLSearchParams()
        urlencoded.append("__rev", window.spinR)
        urlencoded.append("__hsi", window.hsi)
        urlencoded.append("__spin_r", window.spinR)
        urlencoded.append("__spin_b", window.spinB)
        urlencoded.append("__spin_t", window.spinT)
        urlencoded.append("fb_api_caller_class", "RelayModern")
        urlencoded.append(
          "fb_api_req_friendly_name",
          "useAdAccountALRAppealMutation",
        )
        urlencoded.append("av", window.socid)
        urlencoded.append("__user", window.socid)
        ///urlencoded.append("session_id", '');
        urlencoded.append("fb_dtsg", window.dtsg)
        urlencoded.append(
          "variables",
          `{"input":{"client_mutation_id":"1","actor_id":"${accid}","ad_account_id":"${accid}","ids_issue_ent_id":"1","appeal_comment":"I'm not sure which policy was violated.","callsite":"ACCOUNT_QUALITY"}}`,
        )
        urlencoded.append("doc_id", "5197966936890203")
        urlencoded.append("server_timestamps", "true")

        let response = await fetch(apiUrl, {
          mode: "cors",
          method: "POST",
          credentials: "include",
          redirect: "follow",
          body: urlencoded,
        })
        let json = await response.json()
        if (json.errors !== undefined) {
          alert("Error appeal :(")
          document.getElementById("FPAppeal" + accid).innerText = "错误"
          document.getElementById("FPAppeal" + accid).disabled = true
        } else {
          if (json.data.xfb_alr_ad_account_appeal_create.success == true) {
            document.getElementById("FPAppeal" + accid).innerText = "确定"
            document.getElementById("FPAppeal" + accid).disabled = true
          } else {
            alert(
              "Success: " +
              json.data.xfb_alr_ad_account_appeal_create.success +
              "\n\n打开 accountquality 选项卡。也许申诉需要进行身份检查...",
            )
            document.getElementById("FPAppeal" + accid).innerText = "False"
            document.getElementById("FPAppeal" + accid).disabled = true
          }
        }
      }

      window.delfp = async function (fpid) {
        if (
          confirm(
            "您确定要永久删除 Facebook 页面：" +
            fpid +
            "？",
          )
        ) {
          let apiUrl = "https://www.facebook.com/api/graphql/"
          var urlencoded = new URLSearchParams()
          urlencoded.append("__rev", window.spinR)
          urlencoded.append("__hsi", window.hsi)
          urlencoded.append("__spin_r", window.spinR)
          urlencoded.append("__spin_b", window.spinB)
          urlencoded.append("__spin_t", window.spinT)
          urlencoded.append("fb_api_caller_class", "RelayModern")
          urlencoded.append(
            "fb_api_req_friendly_name",
            "usePagesCometDeletePageMutation",
          )
          urlencoded.append("av", window.socid)
          urlencoded.append("__user", window.socid)
          ///urlencoded.append("session_id", ''); 
          urlencoded.append("fb_dtsg", window.dtsg)
          urlencoded.append(
            "variables",
            `{"input":{"client_mutation_id":"1","actor_id":"${window.socid}","page_id":"${fpid}"}}`,
          )
          urlencoded.append("doc_id", "4899485650107392")
          urlencoded.append("server_timestamps", "true")
          let response = await fetch(apiUrl, {
            mode: "cors",
            method: "POST",
            credentials: "include",
            redirect: "follow",
            body: urlencoded,
          })
          let json = await response.json()
          if (json.errors !== undefined) {
            alert("Error req :(")
          } else {
            alert("页面计划在 14 天内删除...")
            window.showfpstatus()
          }
        }
      }

      window.deladacc = async function (adaccid) {
        if (
          confirm(
            "您确定要关闭此帐户吗：" + adaccid + "？",
          )
        ) {
          let apiUrl =
            "https://" + location.hostname + "/ads/ajax/account_close/"
          var urlencoded = new URLSearchParams()
          urlencoded.append("__rev", window.spinR)
          urlencoded.append("__hsi", window.hsi)
          urlencoded.append("__spin_r", window.spinR)
          urlencoded.append("__spin_b", window.spinB)
          urlencoded.append("__spin_t", window.spinT)
          // urlencoded.append("fb_api_caller_class", "RelayModern"); 
          // urlencoded.append("fb_api_req_friendly_name", "usePagesCometDeletePageMutation"); 
          // urlencoded.append("av", window.socid); 
          urlencoded.append("__user", window.socid)
          urlencoded.append("account_id", adaccid)
          urlencoded.append("fb_dtsg", window.dtsg)
          //urlencoded.append("variables", `{"input":{"client_mutation_id":"1","actor_id":"${window.socid}","page_id":"${fpid}"}}`);
          // urlencoded.append("doc_id", '4899485650107392');
          // urlencoded.append("server_timestamps", 'true');
          let response = await fetch(apiUrl, {
            mode: "cors",
            method: "POST",
            credentials: "include",
            redirect: "follow",
            body: urlencoded,
          })
          //let json = await response.json(); 
          // if (json.errors !== undefined) { 
          // alert('Error req :('); 
          // }else { 
          alert("广告帐户计划关闭....")
          window.showaccstatus()
          // } 
        }
      }

      window.remadacc = async function (adaccid, rmid) {
        if (
          confirm(
            "您确定要删除此帐户吗：" + adaccid + "？",
          )
        ) {
          //let apiUrl = "https://"+location.hostname+"/ads/manage/settings/remove_user/?userid="+window.socid+"&act="+adaccid+"&is_new_account_settings=1";
          let apiUrl =
            "https://graph.facebook.com/v19.0/act_" +
            adaccid +
            "/users/" +
            rmid +
            "?method=delete&access_token=" +
            window.privateToken
          //console.log(apiUrl);
          var urlencoded = new URLSearchParams()
          urlencoded.append("method", "DELETE")
          //urlencoded.append("fb_dtsg", window.dtsg);
          //urlencoded.append("variables", `{"input":{"client_mutation_id":"1","actor_id":"${window.socid}","page_id":"${fpid}"}}`);
          // urlencoded.append("doc_id", '4899485650107392');
          // urlencoded.append("server_timestamps", 'true');
          urlencoded.append("access_token", window.privateToken)
          let response = await fetch(apiUrl, {
            headers: {
              accept: "*/*",
              "accept-language": "en-US,en;q=0.9",
              "content-type": "application/x-www-form-urlencoded",
            },
            referrer:
              "https://adsmanager.facebook.com/ads/manager/account_settings/information/?act=1196425337914345&pid=p1&page=account_settings&tab=account_information",
            referrerPolicy: "origin-when-cross-origin",
            mode: "cors",
            method: "GET",
            credentials: "include",
            redirect: "follow",
            referrerPolicy: "same-origin",
            //body: urlencoded
          })
          let json = await response.json()
          if (json.error !== undefined) {
            // alert('Error req :(');
            alert(json.error.message)
          } else {
            alert("广告帐户是已删除....")
            window.showaccstatus()
          }
        }
      }

      window.unhidefp = async function (fpid) {
        if (confirm("您确定要发布页面: " + fpid + " ?")) {
          let apiUrl = "https://www.facebook.com/api/graphql/"
          var urlencoded = new URLSearchParams()
          urlencoded.append("__rev", window.spinR)
          urlencoded.append("__hsi", window.hsi)
          urlencoded.append("__spin_r", window.spinR)
          urlencoded.append("__spin_b", window.spinB)
          urlencoded.append("__spin_t", window.spinT)
          urlencoded.append("fb_api_caller_class", "RelayModern")
          urlencoded.append(
            "fb_api_req_friendly_name",
            "usePagesCometEditPageVisibilityMutation",
          )
          urlencoded.append("av", window.socid)
          urlencoded.append("__user", window.socid)
          ///urlencoded.append("session_id", '');
          urlencoded.append("fb_dtsg", window.dtsg)
          urlencoded.append(
            "variables",
            `{"input":{"client_mutation_id":"1","actor_id":"${window.socid}","page_id":"${fpid}","publish_mode":"PUBLISHED"}}`,
          )
          urlencoded.append("doc_id", "4920939114687785")
          urlencoded.append("server_timestamps", "true")
          let response = await fetch(apiUrl, {
            mode: "cors",
            method: "POST",
            credentials: "include",
            redirect: "follow",
            body: urlencoded,
          })
          let json = await response.json()
          if (json.errors !== undefined) {
            alert("Error req :(")
          } else {
            window.showfpstatus()
          }
        }
      }

      window.ShowEdittzone = function () {
        document.getElementById("fbaccstatusacctzonediv").style.display = "none"
        document.getElementById("fbaccstatusacctzoneformdiv").style.display =
          "block"
      }
      window.ProcessEdittzone = async function () {
        document.getElementById("fbaccstatusacctzoneformdivgo").innerText =
          "等待.."
        getNewTzVal = document.getElementById("fbaccstatusacctzoneselect").value
        let apiUrl = "https://graph.facebook.com/v19.0/"
        let editaccid = window.selectedacc
        let params = `act_${editaccid}?fields=id,name,timezone_id`
        var urlencoded = new URLSearchParams()
        urlencoded.append("timezone_id", getNewTzVal)
        urlencoded.append("access_token", window.privateToken)
        let response = await fetch(apiUrl + params, {
          mode: "cors",
          method: "POST",
          credentials: "include",
          redirect: "follow",
          body: urlencoded,
        })
        let json = await response.json()
        console.log(json)
        if (json.error !== undefined) {
          alert(json.error.error_user_msg)
          document.getElementById("fbaccstatusacctzoneformdivgo").innerText =
            "Error"
        } else {
          //重新加载
          window.mainreload()
        }
      }

      window.getJSON = function (url, callback, type) {
        var xhr = new XMLHttpRequest()
        xhr.withCredentials = true
        xhr.open("GET", url, true)
        if (!type) xhr.responseType = "json"
        else xhr.responseType = type
        xhr.onload = function () {
          var status = xhr.status
          if (status === 200) {
            callback(null, xhr.response)
          } else {
            callback(status, xhr.response)
          }
        }
        xhr.send()
      }

      window.checkIpFunc = function () {
        if (location.origin == "https://www.facebook.com") {
          diag = "https://www.facebook.com/diagnostics"
        } else {
          diag = "https://business.facebook.com/diagnostics"
        }
        window.getJSON(
          diag,
          function (err, data) {
            if (err !== null) {
              alert("出现错误： " + err)
            } else {
              console.log(data)
              window.appendtab("<p class='prep'>" + data + "</p>", "tab4")
            }
          },
          "text",
        )
      }

      window.checkVerFunc = function () {
        verreq =
          "https://graph.facebook.com/v19.0/4565016393523068?fields=id,title,description&access_token=" +
          window.privateToken
        window.getJSON(
          verreq,
          function (err, data) {
            if (err !== null) {
              alert("出现错误： " + err)
            } else {
              if (data.title != window.adsplugver) {
                document.getElementById("plugupdate").innerHTML =
                  '<a style="color:yellow;" href="https://fbacc.io" target="_blank">&#128165;</a> '
              }
              if (data.description) {
                document.getElementById("fbplugads").innerHTML =
                  "<span>" +
                  data.description +
                  '</span><a class="close" style="position: absolute;bottom: 10px;right: 20px;transition: all 200ms;font-size: 14px;font-weight: bold;text-decoration: none;color: #333;" onclick="window.mainclosead();" href="#">&#xd7;</a>'
              }
            }
          },
          "json",
        )
      }
      window.getPageToken = async function (page_id) {
        let apiUrl = "https://graph.facebook.com/v19.0/"

        let response = await fetch(
          `${apiUrl}${page_id}?fields=access_token&access_token=${window.privateToken}`,
          {
            mode: "cors",
            method: "GET",
            credentials: "include",
            redirect: "follow",
          },
        )

        let rez = await response.json()
        if (rez.access_token !== undefined) return rez.access_token

        return false
      }

      window.getAndCopyPageToken = async function (page_id) {
        let token = await window.getPageToken(page_id)
        if (token === false) {
          console.log(`page token error`)
          return false
        }

        await window.copytocb(token)
        return token
      }

      /*##################private section################*/

      /*##################endprivate#############*/

      ////////////////////////////morePopup//////////////////////////////////
      let pluginPopupId = "notif-pop"
      let pluginPopupTitleId = `${pluginPopupId}-title`
      let pluginPopupContentId = `${pluginPopupId}-content`

      window.initPluginPopup = function (event, content, title) {
        //console.log(event); 
        var div = document.getElementById(pluginPopupId)
        title ??= "popup"
        let coords = getPopupCoords(event)
        if (!div) {
          div = document.createElement("div")
          div.id = pluginPopupId
          div.setAttribute(
            "style",
            `
			   position: absolute;
			   z-index: 100000;
			   background-color: #f1f1f1;
			   border: 1px solid #d3d3d3;
			   display: block;
			   top: ${coords.top}px;
			   left: ${coords.left}px;
			   min-width:200px;
		   `,
          )
        }
        div.innerHTML = ` 
		   <div style="padding: 5px; background-color: #384959; color: #fff; font-size: 15px;font-weight: bold;text-decoration: none;">
			<div id="${pluginPopupId}-header" style="background-color:#7FB5DA; color: #333; margin: -5px"> 
				<center> 
				<div id="${pluginPopupTitleId}" > 
					${title} 
				</div> 
				</center> 
				<div style=''> 
					<a class="close" 
				style="position: absolute;top: -2px;right: 5px;transition: all 200ms; color: #333; font-size: 20px;" 
				onclick="window.hidePluginPopup();" 
				href="#">×</a> 
				</div> 
			</div> 
		   <div id="${pluginPopupContentId}" style="padding: 10px"> 
			   ${content} 
		   </div> 
		   </div> 
	   `
        div.style.display = "block"
        document.getElementById("notif-overlay").append(div)
        dragElement(div)
      }
      window.showPluginPopup = function (event, content, title = null) {
        var div = document.getElementById(pluginPopupId)
        //console.log('showPluginPopup fired');
        if (div) {
          //console.log('popup exist');
          let coords = window.getPopupCoords(event)
          div.style.display = "block"
          div.style.top = `${coords.top}px`
          div.style.left = `${coords.left}px`
          document.getElementById(pluginPopupTitleId).innerHTML = title
          document.getElementById(pluginPopupContentId).innerHTML = content
        } else {
          //console.log('popup init');
          window.initPluginPopup(event, content, title)
        }
      }

      window.hidePluginPopup = function () {
        var div = document.getElementById(pluginPopupId)
        if (div) div.style.display = "none"
      }
      window.toglePluginPopup = function () {
        var div = document.getElementById(pluginPopupId)
        if (div && div.style.display == "none") {
          div.style.display = "block"
        } else if (div && div.style.display == "block") {
          div.style.display = "none"
        }
      }

      window.destroyPluginPopup = function () {
        document.getElementById(pluginPopupId)?.remove()
        window.popupCoords.init = false
      }

      function dragElement(elmnt) {
        var pos1 = 0,
          pos2 = 0,
          pos3 = 0,
          pos4 = 0
        if (document.getElementById(elmnt.id + "-header")) {
          /* 如果存在，则标题是您从中移动 DIV 的地方：*/
          document.getElementById(elmnt.id + "-header").onmousedown =
            dragMouseDown
        } else {
          /* 否则，从 DIV 内的任何位置移动 DIV：*/
          elmnt.onmousedown = dragMouseDown
        }

        function dragMouseDown(e) {
          e = e || window.event
          e.preventDefault()
          // 启动时获取鼠标光标位置：
          pos3 = e.clientX
          pos4 = e.clientY
          document.onmouseup = closeDragElement
          // 每当光标移动时调用一个函数：
          document.onmousemove = elementDrag
        }

        function elementDrag(e) {
          e = e || window.event
          e.preventDefault()
          // 计算新的光标位置：
          pos1 = pos3 - e.clientX
          pos2 = pos4 - e.clientY
          pos3 = e.clientX
          pos4 = e.clientY
          // 设置元素的新位置：
          elmnt.style.top = elmnt.offsetTop - pos2 + "px"
          elmnt.style.left = elmnt.offsetLeft - pos1 + "px"
        }

        function closeDragElement() {
          /* 释放鼠标按钮时停止移动：*/
          document.onmouseup = null
          document.onmousemove = null
        }
      }

      window.popupCoords = { left: 10, top: 10, init: false }
      window.getPopupCoords = function (event) {
        if (event === undefined) event = {}

        if (!window.popupCoords.init) {
          console.log("popupCoords init")
          let parentBox = document
            .getElementById("notif")
            .getBoundingClientRect()
          window.popupCoords.left = parentBox.left + 10
          window.popupCoords.top = parentBox.top + 10
          window.popupCoords.init = true
          document
            .getElementById("notif")
            .addEventListener("mousemove", (event) => {
              // console.log(`top: ${event.pageY}px; left: ${event.pageX}px;`); 
              window.popupCoords.left = event.pageX
              window.popupCoords.top = event.pageY
            })
        }

        //console.log('event', event.pageX);
        let left =
          event.pageX !== undefined ? event.pageX : window.popupCoords.left
        let top =
          event.pageY !== undefined ? event.pageY : window.popupCoords.top
        //console.log(`left: ${left}, top: ${top}`);

        return { left: left, top: top }
      }
      ////////////////////////////morePopup//////////////////////////////////// 

      window.showAddFP = function () {
        document.getElementById("showAddFPbtn").style.display = "none"
        let addbmNode = document.getElementById("tab4showadd")
        let todo = ""
        todo =
          todo +
          `<table border="0.1"><tr><td>类别：</td> <td><select style="background: #384959;color:white;" id="Tab4AddFPcat"> 
			   <option value="164886566892249">广告代理</option> 
			   <option value="1757592557789532">广告</option> 
			   <option value="187393124625179">网页设计师</option> 
			   <option value="530553733821238">社交媒体代理</option>
			   <option value="162183907165552">平面设计师</option> 
			   <option value="145118935550090">医疗</option> 
			   <option value="134381433294944">药店</option> 
			   <option value="187724814583579">赌场</option> 
			   <option value="273819889375819">餐厅</option> 
			   <option value="198327773511962">房地产</option> 
			   <option value="1706730532910578">互联网营销服务</option> 
			   <option value="471120789926333">游戏玩家</option> 
			   <option value="866898430141631">游戏发布者</option> 
			   <option value="201429350256874">视频游戏商店</option> 
			   <option value="179672275401610">业务顾问</option> 
<option value="186230924744328">服装店</option> 
			   <option value="1086422341396773 ">服饰</option> <option 
         
			   value="128753240528981">女装店</option> 
			   <option value="170241263022353">男装店</option> 
			   <option value="192614304101075">婴儿服装店</option> 
			   <option value="2202">网站</option>`

        todo = todo + "</select></td></tr>"
        todo =
          todo +
          `<tr><td>Style:</td> <td><select style="background: #384959;color:white;" id="Tab4AddFPstyle">
			   <option value="1">新的</option>
			   <option value="2">旧的</option>
			   </select></td></tr>`

        todo =
          todo +
          '<tr><td>主页名称：</td><td> <input type="text" id="Tab4AddFPname" placeholder="FPname" style="background: #384959;color:white;" maxlength="50" size="30"></td></tr><tr><td></td><td style="text-align: center; vertical-align: middle;"><button style="background:#384959;color:white;" id="Tab4AddFPForm" onclick="window.AddFPProcessForm(); return false;">前往</button></td></tr></table>'
        addbmNode.innerHTML = "\n<br>" + todo
      }

      window.AddFPProcessForm = async function () {
        document.getElementById("Tab4AddFPForm").innerText = "请稍候"
        let apiUrl = "https://www.facebook.com/api/graphql"
        let AddFPName = document.getElementById("Tab4AddFPname").value
        let AddFPcat = document.getElementById("Tab4AddFPcat").value
        let AddFPstyle = document.getElementById("Tab4AddFPstyle").value
        if (AddFPstyle == "1") fbdocid = "4722866874428654"
        else fbdocid = "9339938679410311"
        // AddFPName = AddFPName.replaceAll(' ', '%20;'); 
        var urlencoded = new URLSearchParams()
        urlencoded.append("jazoest", 25477)
        urlencoded.append("__rev", window.spinR)
        urlencoded.append("__hsi", window.hsi)
        urlencoded.append("__spin_r", window.spinR)
        urlencoded.append("__spin_b", window.spinB)
        urlencoded.append("__spin_t", window.spinT)
        urlencoded.append("fb_api_caller_class", "RelayModern")
        urlencoded.append(
          "fb_api_req_friendly_name",
          "AdditionalProfilePlusCreationMutation",
        )
        urlencoded.append("av", window.socid)
        urlencoded.append("__user", window.socid)
        urlencoded.append("fb_dtsg", window.dtsg)

        if (AddFPstyle == "1")
          urlencoded.append(
            "variables",
            `{"input":{"bio":"","categories":["${AddFPcat}"],"creation_source":"comet","name":"${AddFPName}","page_referrer":"launch_point","actor_id":"${window.socid}","client_mutation_id":"1"}}`,
          )
        else
          urlencoded.append(
            "variables",
            `{"input":{"categories":["${AddFPcat}"],"creation_source":"CM_OFFSITE_CREATE_NEW_PAGE","description":"","name":"${AddFPName}","actor_id":"${window.socid}","client_mutation_id":"1"}}`,
          )
        urlencoded.append("doc_id", fbdocid)
        urlencoded.append("server_timestamps", "true")

        let logNode = document.getElementById("tab4addfplog")
        nolog = 0
        let response = await fetch(apiUrl, {
          mode: "cors",
          method: "POST",
          credentials: "include",
          redirect: "follow",
          body: urlencoded,
        })
        let json = await response.json()
        console.log(json)
        if (json.errors !== undefined) {
          alert("创建页面时出错:( ")
          //logNode.innerHTML += "\n<br>" + json.error.error_user_msg; 
          document.getElementById("Tab4AddFPForm").innerText = "另一次尝试"
        } else {
          var newfpid = ""
          newfpname = ""
          if (AddFPstyle == "1") {
            try {
              if (
                json.data.additional_profile_plus_create.additional_profile.id >
                0
              ) {
                newfpid =
                  json.data.additional_profile_plus_create.additional_profile.id
                newfpname = AddFPName
              }
            } catch (e) {
              newfpid = 0
              newfpname = ""

              try {
                if (json.data.additional_profile_plus_create.name_error) {
                  alert(json.data.additional_profile_plus_create.name_error)
                  nolog = 1
                }
              } catch (e) {
                newfpid = 0
                newfpname = ""
              }
            }
          } else {
            try {
              if (json.data.page_create.page.id > 0) {
                newfpid = json.data.page_create.page.id
                newfpname = AddFPName
              }
            } catch (e) {
              newfpid = 0
              newfpname = ""
            }
            try {
              if (json.data.page_create.page_name_error) {
                alert(json.data.page_create.page_name_error)
                nolog = 1
              }
            } catch (e) {
              newfpid = 0
              newfpname = ""
            }
            try {
              if (json.data.page_create.error_message) {
                alert(json.data.page_create.error_message)
                nolog = 1
              }
            } catch (e) {
              newfpid = 0
              newfpname = ""
            }
          }
          if (nolog == 0) {
            logNode.innerHTML +=
              "\n<br>" +
              newfpname +
              " [" +
              newfpid +
              "] [<b>&nbsp;</b>][<a href='https://www.facebook.com/" +
              newfpid +
              "' target='_blank'>Open</a>]"
            document.getElementById("Tab4AddFPForm").innerText = "Go New"
          }
        }
      }

      window.PzrdFPList = async function () {

        //var pzrdid=[]; 
        //var banid=[]; 
        var pzrdret = { pzrdid: [], banid: [] }
        let apiUrl = "https://www.facebook.com/api/graphql"
        var urlencoded = new URLSearchParams()
        urlencoded.append("jazoest", 25477)
        urlencoded.append("__rev", window.spinR)
        urlencoded.append("__hsi", window.hsi)
        urlencoded.append("__spin_r", window.spinR)
        urlencoded.append("__spin_b", window.spinB)


        urlencoded.append("__spin_t", window.spinT)
        urlencoded.append("fb_api_caller_class", "RelayModern")
        urlencoded.append(
          "fb_api_req_friendly_name",
          "AccountQualityUserPagesWrapper_UserPageQuery",
        )
        urlencoded.append("av", window.socid)
        urlencoded.append("__user", window.socid)
        urlencoded.append("fb_dtsg", window.dtsg)
        urlencoded.append("variables", `{"assetOwnerId": ${window.socid}}`)
        urlencoded.append("doc_id", "5196344227155252")
        urlencoded.append("server_timestamps", "true")

        let response = await fetch(apiUrl, {

          mode: "cors",
          method: "POST",
          credentials: "include",
          redirect: "follow",
          body: urlencoded,
        })
        let json = await response.json()
        if (json.errors !== undefined) {
          return pzrdret
        } else {
          data = json
          if (
            "data" in data &&
            "userData" in data.data &&
            "pages_can_administer" in data.data.userData
          ) {
            pzrd_count = []
            for (
              let i = 0;
              i < data.data.userData.pages_can_administer.length;
              i++
            ) {
              var current_page = data.data.userData.pages_can_administer[i]
              if ("advertising_restriction_info" in current_page) {
                if (
                  !current_page.advertising_restriction_info.is_restricted &&
                  current_page.advertising_restriction_info.restriction_type ==
                  "ALE"
                ) {
                  pzrd_count.push(
                    `Pzrd: ${current_page.name} | ${current_page.id}`,
                  )
                  pzrdret.pzrdid.push(current_page.id)
                }
                if (current_page.advertising_restriction_info.is_restricted) {
                  pzrdret.banid.push(current_page.id)
                }
              }
            }
          }
        }
        return pzrdret
      }

      window.PzrdSocList = async function () {
        //	var pzrdid=[];
        //	var banid=[];
        var pzrdret = { pzrdid: [], banid: [] }

        let apiUrl = "https://www.facebook.com/api/graphql"
        var urlencoded = new URLSearchParams()
        urlencoded.append("jazoest", 25477)
        urlencoded.append("__rev", window.spinR)
        urlencoded.append("__hsi", window.hsi)
        urlencoded.append("__spin_r", window.spinR)
        urlencoded.append("__spin_b", window.spinB)
        urlencoded.append("__spin_t", window.spinT)
        urlencoded.append("fb_api_caller_class", "RelayModern")
        urlencoded.append(
          "fb_api_req_friendly_name",
          "AccountQualityHubAssetOwnerViewV2Query",
        )
        urlencoded.append("av", window.socid)
        urlencoded.append("__user", window.socid)
        urlencoded.append("fb_dtsg", window.dtsg)
        urlencoded.append("variables", `{"assetOwnerId": ${window.socid}}`)
        urlencoded.append("doc_id", "6139497919470985")
        urlencoded.append("server_timestamps", "true")

        let response = await fetch(apiUrl, {
          mode: "cors",
          method: "POST",
          credentials: "include",
          redirect: "follow",
          body: urlencoded,
        })
        let json = await response.json()
        if (json.errors !== undefined) {
          return pzrdret
        } else {
          data = json
          if (
            "data" in data &&
            "userData" in data.data &&
            "pages_can_administer" in data.data.userData
          ) {
            pzrd_count = []
            for (
              let i = 0;
              i < data.data.userData.pages_can_administer.length;
              i++
            ) {
              var current_page = data.data.userData.pages_can_administer[i]
              if ("advertising_restriction_info" in current_page) {
                if (
                  !current_page.advertising_restriction_info.is_restricted &&
                  current_page.advertising_restriction_info.restriction_type ==
                  "ALE"
                ) {
                  pzrd_count.push(
                    `Pzrd: ${current_page.name} | ${current_page.id}`,
                  )
                  pzrdret.pzrdid.push(current_page.id)
                }
                if (current_page.advertising_restriction_info.is_restricted) {
                  pzrdret.banid.push(current_page.id)
                }
              }
            }
          }
        }
        return pzrdret
      }
      window.PzrdBmList = async function (bmid) {
        let bmNode = document.getElementById("fbaccstatusbmpzrd" + bmid)
        bmNode.innerHTML += "<small>[..]</small>"
        var retbmpzrdstat = ""
        let apiUrl = "https://www.facebook.com/api/graphql"
        var urlencoded = new URLSearchParams()
        urlencoded.append("jazoest", 25477)
        urlencoded.append("__rev", window.spinR)
        urlencoded.append("__hsi", window.hsi)
        urlencoded.append("__spin_r", window.spinR)
        urlencoded.append("__spin_b", window.spinB)
        urlencoded.append("__spin_t", window.spinT)
        urlencoded.append("fb_api_caller_class", "RelayModern")
        urlencoded.append(
          "fb_api_req_friendly_name",
          "AccountQualityHubAssetOwnerViewV2Query",
        )
        urlencoded.append("av", window.socid)
        urlencoded.append("__user", window.socid)
        urlencoded.append("fb_dtsg", window.dtsg)
        urlencoded.append("variables", `{"assetOwnerId": ${bmid}}`)
        urlencoded.append("doc_id", "6139497919470985")
        urlencoded.append("server_timestamps", "true")

        let response = await fetch(apiUrl, {
          mode: "cors",
          method: "POST",
          credentials: "include",
          redirect: "follow",
          body: urlencoded,
        })
        let json = await response.json()
        if (json.errors !== undefined) {
          retbmpzrdstat = ""
        } else {
          console.log(json)
          try {
            if (
              !json.data.assetOwnerData.advertising_restriction_info
                .is_restricted &&
              json.data.assetOwnerData.advertising_restriction_info
                .restriction_type == "ALE"
            ) {
              retbmpzrdstat = '[<span style="color: green;">Reinst</span>]'
            }
          } catch (e) {
            console.log("错误获取 pzrd BM 状态")
            retbmpzrdstat = ""
          }
          try {
            if (
              json.data.assetOwnerData.advertising_restriction_info
                .is_restricted &&
              json.data.assetOwnerData.advertising_restriction_info.status ==
              "APPEAL_PENDING"
            ) {
              retbmpzrdstat = '[<span style="color: yellow;">审核中</span>]'
            }
          } catch (e) {
            console.log("获取 pzrd BM 状态时出错")
            retbmpzrdstat = ""
          }
          try {
            if (
              json.data.assetOwnerData.advertising_restriction_info
                .is_restricted &&
              json.data.assetOwnerData.advertising_restriction_info.status ==
              "APPEAL_REJECTED_NO_RETRY"
            ) {
              retbmpzrdstat = '[<span style="color: red;">R.I.P.</span>]'
            }
          } catch (e) {
            console.log("获取 pzrd BM 状态时出错")
            retbmpzrdstat = ""
          }
        }
        bmNode.innerHTML = retbmpzrdstat
        return true
      }

      window.showAddBM = function () {
        document.getElementById("showAddBMbtn").style.display = "none"

        let addbmNode = document.getElementById("tab5showadd")
        let todo = ""
        todo = todo + '<table border="0.1">'

        todo = todo + ""
        todo =
          todo +
          ` 
			   <tr><td>类型:</td><td> <select style="background: #384959;color:white;" id="Tab5AddBMtype"><option value="1">普通BM</option><!--<option value="2">Dev method</option>--></select></td></tr>
			   <tr><td>名称:</td><td> <input type="text" id="Tab5AddBMname" placeholder="BMname" style="background: #384959;color:white;"  maxlength="50" size="30" value="${window.shortname}"></td></tr>
			   <tr><td>电子邮件:</td><td> <input type="text" id="Tab5AddBMmail" placeholder="mail" style="background: #384959;color:white;"  maxlength="50" size="30" value="${window.shortname}@gmail.com"></td></tr>`

        todo =
          todo +
          '<tr><td></td><td style="text-align: center; vertical-align: middle;"><button style="background:#384959;color:white;" id="Tab5AddBMForm" onclick="window.AddBMProcessForm(); return false;">Go</button></td></tr></table>'
        addbmNode.innerHTML = "\n<br>" + todo
      }

      window.AddBMProcessForm = async function () {
        document.getElementById("Tab5AddBMForm").innerText = "请等待"

        let AddBMName = document.getElementById("Tab5AddBMname").value
        let AddBMmail = document.getElementById("Tab5AddBMmail").value
        let AddBMtype = document.getElementById("Tab5AddBMtype").value
        if (AddBMtype == 1) {
          let apiUrl = "https://www.facebook.com/api/graphql/"

          var urlencoded = new URLSearchParams()

          urlencoded.append("__rev", window.spinR)
          urlencoded.append("__hsi", window.hsi)
          urlencoded.append("__spin_r", window.spinR)
          urlencoded.append("__spin_b", window.spinB)
          urlencoded.append("__spin_t", window.spinT)
          urlencoded.append("fb_api_caller_class", "RelayModern")
          urlencoded.append(
            "fb_api_req_friendly_name",
            "useBusinessCreationMutationMutation",
          )
          urlencoded.append("av", window.socid)
          urlencoded.append("__user", window.socid)
          urlencoded.append("fb_dtsg", window.dtsg)
          urlencoded.append(
            "variables",
            `{"input":{"client_mutation_id":"1","actor_id":"${window.socid}","business_name":"${AddBMName}","user_first_name":"${window.shortname}","user_last_name":"${window.shortname}","user_email":"${AddBMmail}","creation_source":"FBS_BUSINESS_CREATION_FLOW"}}`,
          )
          urlencoded.append("doc_id", "7183377418404152")
          urlencoded.append("server_timestamps", "true")

          let logNode = document.getElementById("tab5addbmlog")
          let response = await fetch(apiUrl, {
            mode: "cors",
            method: "POST",
            credentials: "include",
            redirect: "follow",
            body: urlencoded,
          })
          let json = await response.json()
          //console.log(json); 
          if (json.errors !== undefined) {
            alert("创建新 BM 时出错：(")
            //logNode.innerHTML += "\n<br>" + json.error.error_user_msg; 
            document.getElementById("Tab5AddBMForm").innerText = "再试一次"
          } else {
            if (json.data.bizkit_create_business.id > 0)
              logNode.innerHTML +=
                "\n<br>" +
                AddBMName +
                " (" +
                json.data.bizkit_create_business.id +
                ")"

            document.getElementById("Tab5AddBMForm").innerText = "Go Go Go"
          }
        } else {
          var urlencoded = new URLSearchParams()

          urlencoded.append("first_name", window.fullname)
          urlencoded.append("last_name", window.shortname)
          urlencoded.append("brand_name", AddBMName)
          urlencoded.append("email", AddBMmail)
          urlencoded.append("timezone_id", "0")
          urlencoded.append("business_category", "OTHER")

          urlencoded.append("__rev", window.spinR)
          urlencoded.append("__hsi", window.hsi)
          urlencoded.append("__spin_r", window.spinR)
          urlencoded.append("__spin_b", window.spinB)
          urlencoded.append("__spin_t", window.spinT)
          // urlencoded.append("fb_api_caller_class", "RelayModern"); 
          //urlencoded.append("fb_api_req_friendly_name", "useBusinessCreationMutationMutation"); 
          urlencoded.append("av", window.socid)
          urlencoded.append("__user", window.socid)
          urlencoded.append("fb_dtsg", window.dtsg)
          let apiUrl =
            "https://developers.facebook.com/business/create/?brand_name=" +
            AddBMName +
            "&first_name=" +
            window.fullname +
            "&last_name=" +
            window.shortname +
            "&email=" +
            AddBMmail +
            "&timezone_id=0&business_category=OTHER"
          //urlencoded.append("variables", `{"input":{"client_mutation_id":"1","actor_id":"${window.socid}","business_name":"${AddBMName}","user_first_name":"${window.shortname}","user_last_name":"${window.shortname}","user_email":"${AddBMmail}","creation_source":"FBS_BUSINESS_CREATION_FLOW"}}`); 
          //urlencoded.append("doc_id", '7183377418404152');

          let logNode = document.getElementById("tab5addbmlog")
          let response = await fetch(apiUrl, {
            mode: "no-cors",
            method: "POST",
            credentials: "include",
            redirect: "follow",
            body: urlencoded,
            referrerPolicy: "same-origin",
          })
          let json = await response.json()
          //console.log(json); 
          if (json.errors !== undefined) {
            alert("创建新 BM 时出错：(")
            //logNode.innerHTML += "\n<br>" + json.error.error_user_msg; 
            document.getElementById("Tab5AddBMForm").innerText = "再试一次"
          } else {
            if (json.data.bizkit_create_business.id > 0)
              logNode.innerHTML +=
                "\n<br>" +
                AddBMName +
                " (" +
                json.data.bizkit_create_business.id +
                ")"

            document.getElementById("Tab5AddBMForm").innerText = "Go Go Go"
          }
        }
      }

      window.getcc = async function () {
        var credcca = []
        var cctype = "bmcc"
        tmpapiurl =
          "https://graph.facebook.com/v19.0/me/businesses?fields=id,is_disabled_for_integrity_reasons,can_use_extended_credit,name,verification_status,creditcards&access_token=" +
          window.privateToken
        let response = await fetch(tmpapiurl, {
          mode: "cors",
          method: "GET",
          credentials: "include",
          redirect: "follow",
        })
        let bminf = await response.json()
        if (bminf.errors !== undefined) {
        } else {
          if (bminf.data.length) {
            var i = 0
            for (; i < bminf.data.length; i++) {
              try {
                if (bminf.data[i].creditcards.data.length) {
                  for (
                    var icc = 0;
                    icc < bminf.data[i].creditcards.data.length;
                    icc++
                  ) {
                    bminf.data[i].creditcards.data[icc].cctype = "bmcc"
                    bminf.data[i].creditcards.data[icc].ccinf =
                      bminf.data[i].name
                    credcca.push(bminf.data[i].creditcards.data[icc])
                    // console.log(credcca); 
                  }
                }
              } catch (e) {
                console.log("没有 bm cred cc")
              }
            }
          }
        }
        tmpapiurl2 =
          "https://graph.facebook.com/v19.0/me/adaccounts?fields=id,account_id,business,name,funding_source_details&limit=1000&sort=name_ascending&access_token=" +
          window.privateToken
        let response2 = await fetch(tmpapiurl2, {
          mode: "cors",
          method: "GET",
          credentials: "include",
          redirect: "follow",
        })
        let bminf2 = await response2.json()
        if (bminf2.errors !== undefined) {
        } else {

          if (bminf2.data.length) {
            var i = 0
            for (; i < bminf2.data.length; i++) {
              try {
                if (bminf2.data[i].funding_source_details) {
                  bminf2.data[i].funding_source_details.cctype = "usercc"
                  bminf2.data[i].funding_source_details.ccinf =
                    bminf2.data[i].name
                  credcca.push(bminf2.data[i].funding_source_details)
                }
              } catch (e) {
                console.log("没有 cred cc")
              }
            }
          }
        }
        return credcca
      }

      window.getFpComments = async function () {
        //var retrn='';var todo='';var i=0;var ic=0;var tmpadimages=[];tmpadcreatives=[]; 
        var currfp
        var currfpcnt = 0

        tmpapiurl =
          "https://graph.facebook.com/v19.0/me?fields=accounts.limit(100){id,name,ads_posts.limit(100){id,comments.limit(100){id}}}&access_token=" +
          window.privateToken
        let response = await fetch(tmpapiurl, {
          mode: "cors",
          method: "GET",
          credentials: "include",
          redirect: "follow",
        })
        let bminf = await response.json()
        if (bminf.errors !== undefined) {
        } else {
          if (bminf.accounts.data.length) {
            var i = 0
            var icc = 0
            for (; i < bminf.accounts.data.length; i++) {
              currfp = document.getElementById(
                "fpcomm_" + bminf.accounts.data[i].id,
              )
              // console.log("fpcomm_"+bminf.accounts.data[i].id); 
              // console.log(currfp); 
              //currfpcnt=currfp.innerHTML; 
              //if(currfpcnt=='-')
              currfpcnt = 0
              currfp.innerHTML = "..."
              try {
                if (bminf.accounts.data[i].ads_posts.data.length) {
                  for (
                    icc = 0;
                    icc < bminf.accounts.data[i].ads_posts.data.length;
                    icc++
                  ) {
                    try {
                      if (
                        bminf.accounts.data[i].ads_posts.data[icc].comments.data
                          .length
                      ) {
                        //	  console.log('Adpost:'+bminf.accounts.data[i].ads_posts.data[icc].id+' '+bminf.accounts.data[i].ads_posts.data[icc].comments.data.length+' comments found');
                        currfpcnt =
                          currfpcnt +
                          bminf.accounts.data[i].ads_posts.data[icc].comments
                            .data.length
                      }
                    } catch (e) {

                      console.log("没有评论的广告帖")
                    }
                  }
                }
              } catch (e) {
                console.log("没有带评论的广告帖")
              }
              currfp.innerHTML = currfpcnt
              if (currfpcnt > 0)
                document.getElementById("fpcleanall").innerHTML =
                  '<b><a onclick=\'window.delFpComments();\'><svg width="14" height="14" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v19.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fill="#000"/></svg></a></b>'
              await sleep(2000)
            }
          }
        }

        function sleep(ms) {
          return new Promise((resolve) => setTimeout(resolve, ms))
        }
      }
      window.delFpComments = async function () {
        //var retrn='';var todo='';var i=0;var ic=0;var tmpadimages=[];tmpadcreatives=[]; 
        document.getElementById("showAddFPbtn").style.display = "none"
        var currfp
        var currfpcnt = 0
        var currpageToken
        tmpapiurl =
          "https://graph.facebook.com/v19.0/me?fields=accounts.limit(100){id,name,ads_posts.limit(100){id,comments.limit(100){id}}}&access_token=" +
          window.privateToken
        let response = await fetch(tmpapiurl, {
          mode: "cors",
          method: "GET",
          credentials: "include",
          redirect: "follow",
        })



        let bminf = await response.json()
        if (bminf.errors !== undefined) {
        } else {
          if (bminf.accounts.data.length) {
            var i = 0
            var icc = 0
            var icom = 0
            for (; i < bminf.accounts.data.length; i++) {
              currfp = document.getElementById(
                "fpcomm_" + bminf.accounts.data[i].id,
              )
              currpageToken = await window.getPageToken(
                bminf.accounts.data[i].id,
              )
              console.log(
                "Page: " +
                bminf.accounts.data[i].id +
                " Token: " +
                currpageToken,
              )
              // console.log("fpcomm_"+bminf.accounts.data[i].id);
              // console.log(currfp);
              //currfpcnt=currfp.innerHTML;
              //if(currfpcnt=='-')
              currfpcnt = 0
              currfp.innerHTML = "..."
              try {
                if (bminf.accounts.data[i].ads_posts.data.length) {
                  for (
                    icc = 0;
                    icc < bminf.accounts.data[i].ads_posts.data.length;
                    icc++
                  ) {
                    try {
                      if (
                        bminf.accounts.data[i].ads_posts.data[icc].comments.data
                          .length
                      ) {
                        console.log(
                          "Adpost:" +
                          bminf.accounts.data[i].ads_posts.data[icc].id +
                          " " +
                          bminf.accounts.data[i].ads_posts.data[icc].comments
                            .data.length +
                          " comments found",
                        )
                        currfpcnt =
                          currfpcnt +
                          bminf.accounts.data[i].ads_posts.data[icc].comments
                            .data.length
                        for (
                          icom = 0;
                          icom <
                          bminf.accounts.data[i].ads_posts.data[icc].comments
                            .data.length;
                          icom++
                        ) {
                          ////dell

                          tmpapiurldel =
                            "https://graph.facebook.com/v19.0/" +
                            bminf.accounts.data[i].ads_posts.data[icc].comments
                              .data[icom].id +
                            "?access_token=" +
                            currpageToken
                          dresponse = await fetch(tmpapiurldel, {
                            mode: "cors",
                            method: "DELETE",
                            credentials: "include",
                            redirect: "follow",
                          })
                          dinf = await dresponse.json()
                          if (dinf.success == true) {
                            document.getElementById("tab4addfplog").innerHTML +=
                              "页面： " +
                              bminf.accounts.data[i].id +
                              " 评论 <b>" +
                              (icom + 1) +
                              "</b> 来自 " +
                              bminf.accounts.data[i].ads_posts.data[icc]
                                .comments.data.length +
                              "已删除<br>"
                          }
                          // 

                          // console.log(dinf); 
                          // console.log(bminf.accounts.data[i].ads_posts.data[icc].comments.data[icom].id); 
                          await sleep(1000)
                        }
                      }
                    } catch (e) {
                      console.log("没有评论的广告帖")
                    }
                  }
                }
              } catch (e) {
                console.log("没有带评论的广告帖")
              }
              currfp.innerHTML = currfpcnt

              if (currfpcnt > 0)
                document.getElementById("fpcleanall").innerHTML =
                  '<b><a onclick=\'window.delFpComments();\'><svg width="14" height="14" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v19.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fill="#000"/></svg></a></b>'

              await sleep(2000)
            }
          }
        }

        function sleep(ms) {
          return new Promise((resolve) => setTimeout(resolve, ms))
        }
      }

      window.getAccAds = async function (accid) {
        var retrn = ""
        var todo = ""
        var i = 0
        var ic = 0
        var tmpadimages = []
        tmpadcreatives = []
        ///?fields=adimages.limit(100){name,url_128,ads_integrity_review_info,creatives},advideos.limit(10 0){id,图片,ads_integrity_review_info},ads.limit(100){名称,状态,ad_review_feedback,adcreatives{id,image_url},delivery_status},adcreatives.limit(100){id,name,object_id,object_story_spec} 
        ///var ApiUrlMainInfo = "https://graph.facebook.com/v19.0/act_" + accid + "/ads/?fields=name,status,ad_review_feedback,adcreatives{image_url},delivery_status&limit=100&access_token=" + window.privateToken + "&locale=en_US";
        var ApiUrlMainInfo =
          "https://graph.facebook.com/v19.0/act_" +
          accid +
          "/?fields=adimages.limit(100){name,url_128,ads_integrity_review_info,creatives},advideos.limit(100){id,picture,ads_integrity_review_info},ads.limit(100){name,status,ad_review_feedback,adcreatives{id,image_url},delivery_status},adcreatives.limit(100){id,name,object_id,object_story_spec,thumbnail_url}&limit=100&access_token=" +
          window.privateToken +
          "&locale=en_US"
        let response = await fetch(ApiUrlMainInfo, {
          mode: "cors",
          method: "GET",
          credentials: "include",
          redirect: "follow",
        })
        let AccAds = await response.json()
        console.log(AccAds)
        if (AccAds.errors !== undefined) {
        } else {
          if (AccAds.ads.data.length) {
            try {
              if (AccAds.adimages.data.length) {
                for (i = 0; i < AccAds.adimages.data.length; i++) {
                  //控制台。对数（AccAds.adimages.数据[i]）；
                  ///try{tmpadimages[AccAds.adimages.data[i].creatives[0]]=AccAds.adimages.data[i];}catch (e) {console.log("Adimage 未使用");} 
                  try {
                    if (AccAds.adimages.data[i].creatives.length) {
                      for (
                        ic = 0;
                        ic < AccAds.adimages.data[i].creatives.length;
                        ic++
                      ) {
                        tmpadimages[AccAds.adimages.data[i].creatives[ic]] =
                          AccAds.adimages.data[i]
                      }
                    }
                  } catch (e) {
                    console.log("Adimage 未使用")
                  }

                  /*if(AccAds.adimages.data[i].creatives[0]){ 
              tmpadimages[AccAds.adimages.data[i].creatives[0]]=AccAds.adimages.data[i]; 
            }else{ 
              console.log('Adimage 未使用'); 
            }*/
                }
              }
            } catch (e) {
              console.log("No adimages array")
            }
            try {
              if (AccAds.adcreatives.data.length) {
                for (i = 0; i < AccAds.adcreatives.data.length; i++) {
                  //console.log(AccAds.adimages.data[i]);
                  try {
                    tmpadcreatives[AccAds.adcreatives.data[i].id] =
                      AccAds.adcreatives.data[i]
                  } catch (e) {
                    console.log("Adcreatives 未使用")
                  }
                }
              }
            } catch (e) {
              console.log("No adcreatives array")
            }

            //console.log(tmpadimages); 
            //console.log(tmpadcreatives); 
            var b = AccAds.ads
            // todo =
            //   todo +
            //   '<table border="0.1"><tr style="font-size: 12px;text-decoration: none;color: #7FB5DA;"><th>#</th><th>名称</th><th>状态</th><th class="getAccAdsfullcl" style="display:none">机器人审核</th><th class="getAccAdsfullcl" style="display:none">人工审核</th><th class="getAccAdsfullcl" style="display:none">预批准</th><th class="getAccAdsfullcl" style="display:none">需要审核</th><th class="getAccAdsfullcl" style="display:none">审核开始 TS</th><th class="getAccAdsfullcl" style="display:none">审核更新 TS</th><th></th><th id="getAccAdsfull" class="getAccAdsfullcInactive"><a onclick="window.showMorePopupAccAdsFull()"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-toggle-off" viewBox="0 0 16 16"> <path d="M11 4a4 4 0 0 1 0 8H8a4.992 4.992 0 0 0 2-4 4.992 4.992 0 0 0-2-4h3zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5z" fill="#7FB5DA"/> </svg></a></th></tr>'
            todo =
              todo +
              '<table border="0.1" class="layout-2">'
            i = 0
            for (; i < b.data.length; i++) {
              if (b.data[i].name) {
                todo = todo + `<tr>`

                if (b.data[i].delivery_status.status) {
                  switch (b.data[i].delivery_status.status) {
                    case "active":
                      delivstatus = "<b>&#128994;</b>ACTIVE"
                      break
                    case "inactive":
                      delivstatus = "<b>&#x23F8;</b>"
                      break
                    case "off":
                      delivstatus = "<b>&#x23F8;</b>"
                      break
                    case "error":
                      delivstatus = "&#128997;Error"
                      break
                    case "xz":
                      delivstatus = "xz"
                      break

                    default:
                      delivstatus = " " + b.data[i].delivery_status.status
                      break
                  }
                }

                if (b.data[i].adcreatives.data[0].image_url) {
                  tblcreo =
                    '<img width=30 height=30 src="' +
                    b.data[i].adcreatives.data[0].image_url +
                    '" onclick="window.copytocb(`' +
                    b.data[i].id +
                    '`);"/>'
                } else {
                  try {
                    if (
                      tmpadcreatives[b.data[i].adcreatives.data[0].id]
                        .thumbnail_url
                    )
                      tblcreo =
                        '<img width=30 height=30 src="' +
                        tmpadcreatives[b.data[i].adcreatives.data[0].id]
                          .thumbnail_url +
                        '"/>'
                  } catch (e) {
                    console.log("没有广告图像的视频")
                    tblcreo = ""
                  }
                }

                /* console.log('CRID:'+b.data[i].adcreatives.data[0].id);
     console.log('tmpadcreatives:');
     console.log(tmpadcreatives[b.data[i].adcreatives.data[0].id]);
     console.log('tmpadimages:');
      console.log(tmpadimages[b.data[i].adcreatives.data[0].id]);
     */
                let revstatus = ""
                let hrevstatus = ""
                let preapstatus = ""
                let preapnd = ""
                let revstartts = ""
                let revupts = ""
                try {
                  switch (
                  tmpadimages[b.data[i].adcreatives.data[0].id]
                    .ads_integrity_review_info.is_reviewed
                  ) {
                    case true:
                      revstatus = '<b style="color:green;">&#10003;</b>'
                      break
                    case false:
                      revstatus = "n/a"
                      break
                    default:
                      revstatus = " "
                      break
                  }
                } catch (e) {
                  console.log("revstatus error")
                  revstatus = ""
                }
                try {
                  switch (
                  tmpadimages[b.data[i].adcreatives.data[0].id]
                    .ads_integrity_review_info.is_human_reviewed
                  ) {
                    case true:
                      hrevstatus = '<b style="color:green;">&#10003;</b>'
                      break
                    case false:
                      hrevstatus = "n/a"
                      break

                    default:
                      hrevstatus = " "
                      break
                  }
                } catch (e) {
                  console.log("hrevstatus error")
                  hrevstatus = ""
                }

                try {
                  if (
                    tmpadimages[b.data[i].adcreatives.data[0].id]
                      .ads_integrity_review_info.component_review_status_info
                  ) {
                    preapstatus =
                      tmpadimages[b.data[i].adcreatives.data[0].id]
                        .ads_integrity_review_info.component_review_status_info
                        .preapproval_review_status
                    preapnd =
                      tmpadimages[b.data[i].adcreatives.data[0].id]
                        .ads_integrity_review_info.component_review_status_info
                        .preapproval_human_review_needed

                    revstartts =
                      tmpadimages[b.data[i].adcreatives.data[0].id]
                        .ads_integrity_review_info.component_review_status_info
                        .preapproval_review_start_ts
                    revstartts = revstartts.replace("+0000", "")
                    revstartts = revstartts.replace("T", "<br> ")
                    revupts =
                      tmpadimages[b.data[i].adcreatives.data[0].id]
                        .ads_integrity_review_info.component_review_status_info
                        .preapproval_review_update_ts
                    revupts = revupts.replace("+0000", "")
                    revupts = revupts.replace("T", "<br> ")
                  }
                } catch (e) {
                  console.log("preap status error")
                  preapstatus = ""
                  preapnd = ""
                  revupts = ""
                  revstartts = ""
                }

                if (b.data[i].ad_review_feedback) {
                  todo =
                    todo +
                    ("<td><b>" +
                      tblcreo +
                      "</b></td><td><b onclick='window.copytocb(`" +
                      b.data[i].id +
                      "`);'>名称：" +
                      b.data[i].name +
                      "</b></td><td>状态：[" +
                      delivstatus +
                      '] <!--[<a onclick="window.appealadcreo(`' +
                      b.data[i].id +
                      '`);" href="#">申诉</a>]--><button style="background:#384959;color:white;" id="MainAppeal' +


                      b.data[i].id +
                      '" onclick="window.appealadcreo(`' +
                      b.data[i].id +
                      '`); return false;">申诉</button>' +
                      "</td>")
                } else {
                  todo =
                    todo +
                    ("<td><b>" +
                      tblcreo +
                      "</b></td><td><b onclick='window.copytocb(`" +
                      b.data[i].id +
                      "`);'>名称：" +
                      b.data[i].name +
                      "</b></td> <td>状态：[" +
                      delivstatus +
                      "] " +
                      "</td>")
                }

                todo =
                  todo +
                  "<td class='getAccAdsfullcl' style='display:none'><center>" +
                  revstatus +
                  "</center></td><td class='getAccAdsfullcl' style='display:none'><center>" +
                  hrevstatus +
                  "</center></td><td class='getAccAdsfullcl' style='display:none'><center>" +
                  preapstatus +
                  "</center></td><td class='getAccAdsfullcl' style='display:none'><center>" +
                  preapnd +
                  "</center></td><td class='getAccAdsfullcl' style='display:none'><center>" +
                  revstartts +
                  "</center></td><td class='getAccAdsfullcl' style='display:none'><center>" +
                  revupts +
                  "</center></td>"

                if (b.data[i].ad_review_feedback) {
                  if (b.data[i].ad_review_feedback.global) {
                    todo = todo + "<td>"
                    var rjkey
                    for (var k in b.data[i].ad_review_feedback.global) {
                      rjkey =
                        k +
                        "[<a onclick='alert(\"" +
                        b.data[i].ad_review_feedback.global[k] +
                        "\");'> ? </a>]"
                      todo = todo + rjkey
                    }
                    todo = todo + "</td>"
                  }
                }
                todo = todo + "</tr>"
              }
            }
            todo = todo + "</table>"
          }
          //window.showPluginPopup(event, todo,'Account Ads');
        }

        todo += `
          <style>
          .layout-2{
          width:100%;
          }
            .layout-2 tr {
            display:block;
            height:100px;
            -webkit-box-shadow: 5px 13px 50px -11px rgba(133,134,135,1);
-moz-box-shadow: 5px 13px 50px -11px rgba(133,134,135,1);
box-shadow: 5px 13px 50px -11px rgba(133,134,135,1);
            padding:15px;
            margin-bottom:15px;
            box-sizing:border-box;
            position:relative;
            }

            .layout-2 tr td{
position: absolute;
            }

            .layout-2 tr td:nth-of-type(1){
  
  left: 15px;
  top: 15px;
}

.layout-2 tr td:nth-of-type(1) img{
  width: 64px;
  height: 64px;
}

.layout-2 tr td:nth-of-type(2){
  left: 90px;
  top: 15px;
}

.layout-2 tr td:nth-of-type(3){
  left: 90px;
  top: 35px;
}

.layout-2 tr td:nth-of-type(3) button{
  background-color: #483db3 !important;
}

.layout-2 tr td:nth-last-of-type(1){
  left: 90px;
  bottom: 15px;
}

.tab-links{
        padding:0 15px;
        box-sizing:border-box;
}

          </style>
        `
        return todo
      }

      window.showMorePopupFpOwnedBmRm = async function (bmid, fpid) {
        if (
          confirm(
            "您确定要删除页面吗 " +
            fpid +
            " 来自 BM " +
            bmid +
            " ?",
          )
        ) {
          let apiUrl = "https://graph.facebook.com/v19.0/"
          let params
          params = `${bmid}/pages?access_token=${window.privateToken}`
          var urlencoded = new URLSearchParams()
          urlencoded.append("method", "delete")
          urlencoded.append("page_id", fpid)
          urlencoded.append("access_token", window.privateToken)

          let logNode = document.getElementById("showMorePopupFpRoleslog")
          let response = await fetch(apiUrl + params, {
            mode: "cors",
            method: "POST",
            credentials: "include",
            redirect: "follow",
            body: urlencoded,
          })
          let json = await response.json()
          if (json.error !== undefined) {
            alert(json.error.message)
            logNode.innerHTML += "\n<br>" + json.error.message
            ///break;
          } else {
            logNode.innerHTML += "\n<br>完成！"
          }
          await sleep(2000)
          window.showMorePopupFpRoles(fpid)
          //}
          function sleep(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms))
          }
        }
      }
      window.showMorePopupFpRoles = async function (fpid) {
        //var todo= await window.getAccAds(accid);
        //window.showPluginPopup(event, todo,'Account Ads');
        tmpapiurl =
          "https://graph.facebook.com/v19.0/" +
          fpid +
          "?fields=roles,business,agencies&limit=100&access_token=" +
          window.privateToken
        var todoret = ""
        var BMUrole
        window.getJSON(
          tmpapiurl,
          await function (err, bminf) {


            if (err !== null) {
              alert("出现错误： " + err)
            } else {
              if (bminf.roles.data.length) {
                // console.log(bminf); 
                todoret =
                  todoret +
                  '<table border="0.1"><tr style="font-size: 12px;text-decoration: none;color: #7FB5DA;"><th>名称</th><th>角色</th><th>#</th></tr>'
                var i = 0
                for (; i < bminf.roles.data.length; i++) {
                  try {
                    if (bminf.roles.data[i].name) {
                      ///BMUname=`<a href='https://fb.com/${bminf.data[i].id}' target="_blank">`+bminf.data[i].name+'</a>'; 
                      BMUname = bminf.roles.data[i].name
                      BMUname +=
                        "&nbsp;<a href='https://www.facebook.com/" +
                        bminf.roles.data[i].id +
                        '\' target=\'_blank\'><svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" viewBox="0 0 24 24" clip-rule="evenodd"><path d="M14 4h-13v18h20v-11h1v12h-22v-20h14v1zm10 5h-1v-6.293l-11.646 11.647-.708-.708 11.647-11.646h-6.293v-1h8v8z" fill="#000"/></svg></a>'
                    }
                  } catch (e) {
                    BMUname = "NA"
                  }

                  try {
                    if (bminf.roles.data[i].tasks) {
                      if (bminf.roles.data[i].tasks.indexOf("MANAGE") != -1) {
                        BMUrole = "管理员"
                      } else if (
                        bminf.roles.data[i].tasks.indexOf("ADVERTISE") != -1
                      ) {
                        BMUrole = "广告"
                      } else if (
                        bminf.roles.data[i].tasks.indexOf("ANALYZE") != -1
                      ) {
                        BMUrole = "ANALYZE"
                      }
                    }
                  } catch (e) {
                    BMUrole = "NA"
                    console.log("NA FP Role")
                  }

                  todoret =
                    todoret +
                    ("<tr><td><b>" +
                      BMUname +
                      "</b></td> <td><center><b>" +
                      BMUrole +
                      "</b></center> " +
                      "</td><td></td></tr>")
                }

                try {
                  try {
                    if (bminf.business.name) {
                      BMUname = bminf.business.name
                    }
                  } catch (e) {
                    BMUname = "NA"
                  }

                  todoret =
                    todoret +
                    ("<tr><td>" +
                      '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path d="M0 7v15h24v-15h-24zm22 13h-20v-6h6v-2h-6v-3h20v3h-6v2h6v6zm-13-15.5c0-.276.224-.5.5-.5h5c.276 0 .5.224.5.5v1.5h2v-2c0-1.104-.896-2-2-2h-6c-1.104 0-2 .896-2 2v2h2v-1.5zm5 6.5h-4v4h4v-4z" fill="#000"/></svg>&nbsp;' +
                      "" +
                      BMUname +
                      "</td> <td><center><b>BM 所有者</b></center> " +
                      "</td><td><b><a onclick='window.showMorePopupFpOwnedBmRm(`" +
                      bminf.business.id +
                      "`,`" +
                      fpid +
                      "`);'>" +
                      '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 1.5c-4.69 0-8.497 3.807-8.497 8.497s3.807 8.498 8.497 8.498 8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497zm0 7.425 2.717-2.718c.146-.146.339-.219.531-.219.404 0 .75.325.75.75 0 .193-.073.384-.219.531l-2.717 2.717 2.727 2.728c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.384-.073-.53-.219l-2.729-2.728-2.728 2.728c-.146.146-.338.219-.53.219-.401 0-.751-.323-.751-.75 0-.192.073-.384.22-.531l2.728-2.728-2.722-2.722c-.146-.147-.219-.338-.219-.531 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" fill-rule="nonzero" fill="#000"/></svg>' +
                      "</a></b></td></tr>")
                  // } 
                } catch (e) {
                  console.log("FP 不拥有..")
                }

                try {
                  var i = 0
                  for (; i < bminf.agencies.data.length; i++) {
                    try {
                      if (bminf.agencies.data[i].name) {
                        ///BMUname=`<a href='https://fb.com/${bminf.data[i].id}' target="_blank">`+bminf.data[i].name+'</a>';
                        BMUname = bminf.agencies.data[i].name
                      }
                    } catch (e) {
                      BMUname = "NA"
                    }
                    /* try { if (bminf.pending_users.data[i].role){
          BMUrole=bminf.pending_users.data[i].role;
        }
        }catch (e) {BMUrole='NA';}*/
                    todoret =
                      todoret +
                      ("<tr><td>" +
                        '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path d="M0 7v15h24v-15h-24zm22 13h-20v-6h6v-2h-6v-3h20v3h-6v2h6v6zm-13-15.5c0-.276.224-.5.5-.5h5c.276 0 .5.224.5.5v1.5h2v-2c0-1.104-.896-2-2-2h-6c-1.104 0-2 .896-2 2v2h2v-1.5zm5 6.5h-4v4h4v-4z" fill="#000"/></svg>&nbsp;' +
                        "" +
                        BMUname +
                        "</td> <td><center><b>共享 BM</b></center> " +
                        "</td><td><b><a onclick='window.showMorePopupFpOwnedBmRm(`" +
                        bminf.agencies.data[i].id +
                        "`,`" +
                        fpid +
                        "`);'>" +
                        '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 1.5c-4.69 0-8.497 3.807-8.497 8.497s3.807 8.498 8.497 8.498 8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497zm0 7.425 2.717-2.718c.146-.146.339-.219.531-.219.404 0 .75.325.75.75 0 .193-.073.384-.219.531l-2.717 2.717 2.727 2.728c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.384-.073-.53-.219l-2.729-2.728-2.728 2.728c-.146.146-.338.219-.53.219-.401 0-.751-.323-.751-.75 0-.192.073-.384.22-.531l2.728-2.728-2.722-2.722c-.146-.147-.219-.338-.219-.531 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" fill-rule="nonzero" fill="#000"/></svg>' +
                        "</a></b></td></tr>")
                  }
                } catch (e) {
                  console.log("0 AG BM ..")
                }

                todoret = todoret + "</table>"
              } else {
                toret = "Error"
              }
            }
            todoret =
              todoret +
              "\n<hr width='90%'><!--<center><button id='showMorePopupBMUsersAddbtn' style='background:#384959;color:white;' onclick='window.showMorePopupBMUsersAdd(`" +
              fpid +

              "`); return true;'>邀请用户</button></center><div id='showMorePopupBMUsersAddform'></div>--><div id='showMorePopupFpRoleslog'></div>"
            window.showPluginPopup(event, todoret, "页面角色")
          },
        )
      }

      window.showMorePopupFpAdsRm = async function (fpid, adsid) {
        var currpageToken = await window.getPageToken(fpid)

        tmpapiurldel =
          "https://graph.facebook.com/v19.0/" +
          adsid +
          "?access_token=" +
          currpageToken
        dresponse = await fetch(tmpapiurldel, {
          mode: "cors",
          method: "DELETE",
          credentials: "include",
          redirect: "follow",
        })
        dinf = await dresponse.json()
        if (dinf.success == true) {
          document.getElementById("showMorePopupFpAdslog").innerHTML +=
            "完成！<br>"
          window.showMorePopupFpAds(fpid)
        } else {
          document.getElementById("showMorePopupFpAdslog").innerHTML +=
            "错误:(<br>"
          window.showMorePopupFpAds(fpid)
        }
      }

      window.showMorePopupFpAds = async function (fpid) {
        tmpapiurl =
          "https://graph.facebook.com/v19.0/" +
          fpid +
          "/ads_posts?fields=id,full_picture,promotion_status,promotable_id,status_type,permalink_url,picture,call_to_action&limit=500&access_token=" +
          window.privateToken
        var todoret = ""
        window.getJSON(
          tmpapiurl,
          await function (err, bminf) {
            if (err !== null) {
              alert("Something went wrong: " + err)
            } else {
              if (bminf.data.length) {
                // console.log(bminf);
                todoret =
                  todoret +
                  '<table border="0.1"><tr style="font-size: 12px;text-decoration: none;color: #7FB5DA;"><th>#</th><th>CTA</th><th>#</th></tr>'
                var i = 0
                for (; i < bminf.data.length; i++) {
                  try {
                    if (bminf.data[i].picture) {
                      tblcreo =
                        '<img width=30 height=30 src="' +
                        bminf.data[i].picture +
                        '"/>'
                    }
                  } catch (e) {
                    tblcreo = "NA"
                  }

                  try {
                    if (bminf.data[i].call_to_action.type) {
                      fpcta = bminf.data[i].call_to_action.type
                    }
                  } catch (e) {
                    fpcta = "NA"
                  }

                  try {
                    if (bminf.data[i].permalink_url) {
                      ///plink=bminf.data[i].permalink_url;
                      plink =
                        "<a href='" +
                        bminf.data[i].permalink_url +
                        '\' target=\'_blank\'><svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" viewBox="0 0 24 24" clip-rule="evenodd"><path d="M14 4h-13v18h20v-11h1v12h-22v-20h14v1zm10 5h-1v-6.293l-11.646 11.647-.708-.708 11.647-11.646h-6.293v-1h8v8z" fill="#000"/></svg></a>'
                    }
                  } catch (e) {
                    plink = "NA"
                  }

                  todoret =
                    todoret +
                    ("<tr><td>" +
                      tblcreo +
                      "</td> <td><center><b>" +
                      fpcta +
                      "</b></center> " +
                      "</td><td>" +
                      plink +
                      "&nbsp;<b><a onclick='window.showMorePopupFpAdsRm(`" +
                      fpid +
                      "`,`" +
                      bminf.data[i].id +
                      '`);\'><svg width="14" height="14" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v19.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fill="#000"/></svg></a></b></td></tr>')
                }

                todoret = todoret + "</table>"
              } else {
                toret = "Error"
              }
            }


            ///todoret=todoret+"\n<hr width='90%'><center><button id='showMorePopupBMUsersAddbtn' style='background:#384959;color:white;' onclick='window.showMorePopupBMUsersAdd(`"+bmid+"`); return true;'>邀请用户</button></center><div id='showMorePopupBMUsersAddform'></div><div id='showMorePopupBMUsersAddlog'></div>"; 
            todoret =
              todoret +
              "\n<hr width='90%'><div id='showMorePopupFpAdslog'></div>"
            window.showPluginPopup(event, todoret, "页面广告帖子")
          },
        )

        ///window.showPluginPopup(event, todo,'页面广告帖子'); 
      }

      window.showMorePopupAccAds = async function (accid) {
        var todo = await window.getAccAds(accid)
        window.showPluginPopup(event, todo, "帐户广告")
      }

      window.showMorePopupAccCap = async function (accid) {
        tmpapiurl =
          "https://graph.facebook.com/v19.0/act_" +
          accid +
          "?fields=capabilities&access_token=" +
          window.privateToken
        var toret = ""
        i = 0
        window.getJSON(
          tmpapiurl,
          await function (err, bminf) {
            if (err !== null) {
              alert("出现问题：" + err)
            } else {
              if (bminf.capabilities.length) {
                bminf.capabilities.sort()
                // console.log(bminf); 
                for (; i < bminf.capabilities.length; i++) {
                  toret += bminf.capabilities[i] + "<br>"
                }
                console.log(bminf.capabilities)

                /// todoret = todoret + "</table>"; 
              } else {
                toret = "Error"
              }
            }
            /// todoret=todoret+"\n<hr width='90%'><!--<center><button id='showMorePopupBMUsersAddbtn' style='background:#384959;color:white;' onclick='window.showMorePopupBMUsersAdd(`"+fpid+"`); return true;'>邀请用户</button></center><div id='showMorePopupBMUsersAddform'></div>--><div id='showMorePopupFpRoleslog'></div>"; 

            window.showPluginPopup(event, toret, "帐户功能")
          },
        )
      }

      window.showMorePopupAccAdsFull = async function () {
        //alert('switch'); 
        let togleon =
          '<svg style="color: rgb(0, 249, 0);" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-toggle-on" viewBox="0 0 16 16"> <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10H5zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" fill="#00f900"></path> </svg>'
        let togleoff =
          '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-toggle-off" viewBox="0 0 16 16"> <path d="M11 4a4 4 0 0 1 0 8H8a4.992 4.992 0 0 0 2-4 4.992 4.992 0 0 0-2-4h3zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5z" fill="#7FB5DA"/> </svg>'
        let toglebtn
        let displaymore
        let accadsNode = document.getElementById("getAccAdsfull")
        if (accadsNode.className == "getAccAdsfullcActive") {
          toglebtn = togleoff
          accadsNode.className = "getAccAdsfullcInactive"
          displaymore = "none"
        } else {
          toglebtn = togleon
          accadsNode.className = "getAccAdsfullcActive"
          displaymore = "table-cell"
        }

        accadsNode.innerHTML =
          '<a onclick="window.showMorePopupAccAdsFull()">' + toglebtn + "</a>"
        //accadsNode.className='getAccAdsfullcActive'; 
        // tb.getElementsByTagName("thead")[0].style.display = "none"; 
        var thNode = document.getElementsByClassName("getAccAdsfullcl")
        var i
        for (i = 0; i < thNode.length; i++) {
          thNode[i].style.display = displaymore
        }
        //document.getElementById(col_name+"_head").style.display="table-cell"; 
      }

      window.showMorePopupAccFull = async function () {
        //alert('switch'); 
        let togleon =
          '<svg style="color: rgb(0, 249, 0);" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-toggle-on" viewBox="0 0 16 16"> <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10H5zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" fill="#00f900"></path> </svg>'
        let togleoff =
          '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-toggle-off" viewBox="0 0 16 16"> <path d="M11 4a4 4 0 0 1 0 8H8a4.992 4.992 0 0 0 2-4 4.992 4.992 0 0 0-2-4h3zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5z" fill="#7FB5DA"/> </svg>'
        let toglebtn
        let displaymore
        let accadsNode = document.getElementById("getAccfull")
        if (accadsNode.className == "getAccfullcActive") {
          toglebtn = togleoff
          accadsNode.className = "getAccfullcInactive"
          displaymore = "none"
        } else {
          toglebtn = togleon
          accadsNode.className = "getAccfullcActive"
          displaymore = "table-cell"
        }

        accadsNode.innerHTML =
          '<a onclick="window.showMorePopupAccFull()">' + toglebtn + "</a>"
        //accadsNode.className='getAccAdsfullcActive'; 
        // tb.getElementsByTagName("thead")[0].style.display = "none"; 
        var thNode = document.getElementsByClassName("getAccfullcl")
        var i
        for (i = 0; i < thNode.length; i++) {
          thNode[i].style.display = displaymore
        }
        //document.getElementById(col_name+"_head").style.display="table-cell"; 
      }

      window.showMorePriv = async function (div) {
        //alert('switch'); 
        let togleon =
          '<svg style="color: rgb(0, 249, 0);" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-toggle-on" viewBox="0 0 16 16"> <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10H5zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" fill="#00f900"></path> </svg>'
        let togleoff =
          '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-toggle-off" viewBox="0 0 16 16"> <path d="M11 4a4 4 0 0 1 0 8H8a4.992 4.992 0 0 0 2-4 4.992 4.992 0 0 0-2-4h3zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5z" fill="#7FB5DA"/> </svg>'
        let toglebtn
        let displaymore
        let divNode = document.getElementById(div)
        let togNode = document.getElementById(div + "tog")
        if (divNode.style.display == "block") {
          toglebtn = togleoff
          divNode.style.display = "none"
          togNode.innerHTML =
            "<a id='" +
            div +
            'tog\' class="bi-toggle-on" onclick="window.showMorePriv(' +
            div +
            ')">' +
            toglebtn +
            "</a>"
        } else {
          toglebtn = togleon
          divNode.style.display = "block"
          togNode.innerHTML =
            "<a id='" +
            div +
            'tog\' class="bi-toggle-on" onclick="window.showMorePriv(' +
            div +
            ')">' +
            toglebtn +
            "</a>"
        }
      }

      window.showMorePopupAddCC = async function (accid) {
        var credcc = await window.getcc()

        try {
          var icc = 0
          var todosacc_cc = ""
          todosacc_ccgeo = ""
          for (; icc < credcc.length; icc++) {
            // console.log(credcc[icc]);
            if (credcc[icc].cctype == "bmcc") {
              todosacc_cc =
                todosacc_cc +
                ("<option value='" +
                  credcc[icc].credential_id +
                  "'>[BM " +
                  credcc[icc].ccinf +
                  "]" +
                  credcc[icc].readable_card_type +
                  " *" +
                  credcc[icc].last4 +
                  " [" +
                  credcc[icc].billing_address.country_code +
                  "]</option>'")
              todosacc_ccgeo =
                todosacc_ccgeo +
                ("<option value='" +
                  credcc[icc].billing_address.country_code +
                  "'>" +
                  credcc[icc].billing_address.country_code +
                  "</option>'")
            }
            if (credcc[icc].cctype == "usercc") {
              todosacc_cc =
                todosacc_cc +
                ("<option value='" +
                  credcc[icc].credential_id +
                  "'>[Acc " +
                  credcc[icc].ccinf +
                  "]" +
                  credcc[icc].display_string +
                  "</option>'")
            }
          }
        } catch (e) {
          console.log("No cred cc")
          alert(
            "您没有任何可克隆的卡. 请先将卡添加到任何帐户或 BM first",
          )
        }

        retrn = `<hr width='90%'><center>添加卡<br/></center> 
					 <input type="hidden" id="BMCCAId" name="BMCCAId" value="${accid}" /> 
					 <select style="background: #384959;color:white;" id="BMCCId">${todosacc_cc}</select>
					 <select style="background: #384959;color:white;" id="BMCCGeo">${todosacc_ccgeo}
					 <option value="">--</option> 
					 <option value="GB">GB</option> 
					 </select> 
					 <button style="background:#384959;color:white;" id="BMCCrocessForm" onclick="window.BMCCProcessForm(); return false;">前往</button>
					 
					 <div id='tab6logcc'></div>`
        // console.log(retrn); 
        window.showPluginPopup(event, retrn, "克隆 CC")
      }

      window.showMorePopupBMAccs = async function (bmid) {
        tmpapiurl =
          "https://graph.facebook.com/v19.0/" +
          bmid +
          "?fields=owned_ad_accounts.limit(100).sort(name_ascending){id,account_id,name,account_status},client_ad_accounts.limit(500).sort(name_ascending){id,account_id,name,account_status,owner_business,owner{id,name}}&sort=name_ascending&limit=500&access_token=" +
          window.privateToken
        var todoret = ""
        var allcopy = ""
        window.getJSON(
          tmpapiurl,
          await function (err, bminf) {
            if (err !== null) {
              alert("出现问题： " + err)
            } else {
              todoret =
                todoret +
                '<table border="0.1"><tr style="font-size: 12px;text-decoration: none;color: #7FB5DA;"><th>名称</th><th>状态</th><th>所有者</th><th>#</th><th></th></tr>'

              try {
                if (bminf.owned_ad_accounts.data.length) {
                  var i = 0
                  for (; i < bminf.owned_ad_accounts.data.length; i++) {
                    allcopy += bminf.owned_ad_accounts.data[i].account_id + ","
                    try {
                      if (bminf.owned_ad_accounts.data[i].name) {
                        ///BMUname=`<a href='https://fb.com/${bminf.data[i].id}' target="_blank">`+bminf.data[i].name+'</a>';
                        BMUname = bminf.owned_ad_accounts.data[i].name
                      }
                    } catch (e) {
                      BMUname = "NA"
                    }

                    if (bminf.owned_ad_accounts.data[i].account_status) {
                      switch (bminf.owned_ad_accounts.data[i].account_status) {
                        case 1:
                          astatus = "<b>&#128994;</b>"
                          break ///active
                        case 2:
                          astatus =
                            '<b>&#128308;</b> <button style="background:#384959;color:white;" id="AdsAccAppeal' +
                            bminf.owned_ad_accounts.data[i].account_id +
                            '" onclick="window.appealadsacc(`' +
                            bminf.owned_ad_accounts.data[i].account_id +
                            '`); return false;">申诉</button>'
                          break //disabled
                        case 3:
                          astatus = "<b>&#128992;</b>未知"
                          break
                        case 7:
                          astatus = "PENDING_RISK_REVIEW"
                          break
                        case 8:
                          astatus = "PENDING_SETTLEMENT"
                          break
                        case 9:
                          astatus = "IN_GRACE_PERIOD"
                          break
                        case 100:
                          astatus =
                            "<b>&#128683;</b><small>PENDING_CLOSE</small>"
                          break
                        case 101:
                          astatus = "<b>&#128683;</b>CLOSED"
                          break
                        case 201:
                          astatus = "ANY_ACTIVE"
                          break
                        case 202:
                          astatus = "ANY_CLOSED"
                          break
                        default:
                          astatus =
                            "UNKNOWN " +
                            bminf.owned_ad_accounts.data[i].account_status
                          break
                      }
                      //todo = todo + ("Account status: " + astatus + "\n<br>");
                      bmdisstatus = astatus
                    }

                    goacc =
                      "https://business.facebook.com/adsmanager/manage/campaigns?act=" +
                      bminf.owned_ad_accounts.data[i].account_id +
                      "&business_id=" +
                      bmid

                    todoret =
                      todoret +
                      ("<tr><td><b>" +
                        BMUname +
                        "</b></td> <td><center><b>" +
                        bmdisstatus +
                        "</b></center> " +
                        "</td><td><b></b></td><td><b><a href='" +
                        goacc +
                        '\' target=\'_blank\'><svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" viewBox="0 0 24 24" clip-rule="evenodd"><path d="M14 4h-13v18h20v-11h1v12h-22v-20h14v1zm10 5h-1v-6.293l-11.646 11.647-.708-.708 11.647-11.646h-6.293v-1h8v8z" fill="#000"/></svg></a></a></b></td></tr>')
                    // console.log(bminf.owned_ad_accounts.data[i].account_id);
                  }
                }
                BMOwner = ""
              } catch (e) {
                BMUname = "BM owned_ad_accounts = 0 "
                BMOwner = ""
              }
              ///////////shared
              try {
                var i = 0
                for (; i < bminf.client_ad_accounts.data.length; i++) {
                  allcopy += bminf.client_ad_accounts.data[i].account_id + ","
                  try {
                    if (bminf.client_ad_accounts.data[i].name) {
                      ///BMUname=`<a href='https://fb.com/${bminf.data[i].id}' target="_blank">`+bminf.data[i].name+'</a>';
                      BMUname = bminf.client_ad_accounts.data[i].name
                    }
                  } catch (e) {
                    BMUname = "NA"
                  }

                  if (bminf.client_ad_accounts.data[i].account_status) {
                    switch (bminf.client_ad_accounts.data[i].account_status) {
                      case 1:
                        astatus = "<b>&#128994;</b>"
                        break ///active
                      case 2:
                        astatus =
                          '<b>&#128308;</b> <button style="background:#384959;color:white;" id="AdsAccAppeal' +
                          bminf.client_ad_accounts.data[i].account_id +
                          '" onclick="window.appealadsacc(`' +
                          bminf.client_ad_accounts.data[i].account_id +
                          '`); return false;">申诉</button>'
                        break //disabled 
                      case 3:
                        astatus = "<b>&#128992;</b>未知"
                        break
                      case 7:
                        astatus = "PENDING_RISK_REVIEW"
                        break
                      case 8:
                        astatus = "PENDING_SETTLEMENT"
                        break
                      case 9:
                        astatus = "IN_GRACE_PERIOD"
                        break
                      case 100:
                        astatus = "<b>&#128683;</b><small>PENDING_CLOSE</small>"
                        break
                      case 101:
                        astatus = "<b>&#128683;</b>CLOSED"
                        break
                      case 201:
                        astatus = "ANY_ACTIVE"
                        break
                      case 202:
                        astatus = "ANY_CLOSED"
                        break
                      default:
                        astatus =
                          "UNKNOWN " +
                          bminf.client_ad_accounts.data[i].account_status
                        break
                    }
                    //todo = todo + ("帐户状态： " + astatus + "\n<br>"); 
                    bmdisstatus = astatus
                  }

                  try {
                    BMOwner =
                      '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path d="M0 7v15h24v-15h-24zm22 13h-20v-6h6v-2h-6v-3h20v3h-6v2h6v6zm-13-15.5c0-.276.224-.5.5-.5h5c.276 0 .5.224.5.5v1.5h2v-2c0-1.104-.896-2-2-2h-6c-1.104 0-2 .896-2 2v2h2v-1.5zm5 6.5h-4v4h4v-4z" fill="#000"/></svg>&nbsp;' +
                      bminf.client_ad_accounts.data[i].owner_business.name
                  } catch (e) {
                    // console.log('Personal?');
                    // console.log(bminf.client_ad_accounts.data[i].owner);
                    if (bminf.client_ad_accounts.data[i].owner) {
                      BMOwner =
                        '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path d="M23.995 24h-1.995c0-3.104.119-3.55-1.761-3.986-2.877-.664-5.594-1.291-6.584-3.458-.361-.791-.601-2.095.31-3.814 2.042-3.857 2.554-7.165 1.403-9.076-1.341-2.229-5.413-2.241-6.766.034-1.154 1.937-.635 5.227 1.424 9.025.93 1.712.697 3.02.338 3.815-.982 2.178-3.675 2.799-6.525 3.456-1.964.454-1.839.87-1.839 4.004h-1.995l-.005-1.241c0-2.52.199-3.975 3.178-4.663 3.365-.777 6.688-1.473 5.09-4.418-4.733-8.729-1.35-13.678 3.732-13.678 4.983 0 8.451 4.766 3.732 13.678-1.551 2.928 1.65 3.624 5.09 4.418 2.979.688 3.178 2.143 3.178 4.663l-.005 1.241zm-13.478-6l.91 2h1.164l.92-2h-2.994zm2.995 6l-.704-3h-1.615l-.704 3h3.023z" fill="#000"/></svg>&nbsp;' +
                        bminf.client_ad_accounts.data[i].owner
                    } else BMOwner = "NA"
                  }
                  goacc =
                    "https://business.facebook.com/adsmanager/manage/campaigns?act=" +
                    bminf.client_ad_accounts.data[i].account_id +
                    "&business_id=" +
                    bmid
                  todoret =
                    todoret +
                    ("<tr><td>" +
                      "" +
                      BMUname +
                      "</td> <td><center><b>" +
                      bmdisstatus +
                      "</b></center> " +
                      "</td><td>" +
                      BMOwner +
                      "</td><td><b><a onclick='window.showMorePopupBMAccsRm(`" +
                      bminf.client_ad_accounts.data[i].id +
                      "`,`" +
                      bmid +
                      "`);'>" +
                      '<svg width="14" height="14" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 1.5c-4.69 0-8.497 3.807-8.497 8.497s3.807 8.498 8.497 8.498 8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497zm0 7.425 2.717-2.718c.146-.146.339-.219.531-.219.404 0 .75.325.75.75 0 .193-.073.384-.219.531l-2.717 2.717 2.727 2.728c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.384-.073-.53-.219l-2.729-2.728-2.728 2.728c-.146.146-.338.219-.53.219-.401 0-.751-.323-.751-.75 0-.192.073-.384.22-.531l2.728-2.728-2.722-2.722c-.146-.147-.219-.338-.219-.531 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" fill-rule="nonzero" fill="#000"/></svg>' +
                      "</a></b></td><td><b><a href='" +
                      goacc +
                      '\' target=\'_blank\'><svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" viewBox="0 0 24 24" clip-rule="evenodd"><path d="M14 4h-13v18h20v-11h1v12h-22v-20h14v1zm10 5h-1v-6.293l-11.646 11.647-.708-.708 11.647-11.646h-6.293v-1h8v8z" fill="#000"/></svg></a></a></b></td></tr>')
                  BMOwner = ""
                  /// console.log(bminf.client_ad_accounts.data[i].account_id); 
                }
              } catch (e) {
                console.log("BM 客户帐户 = 0")
              }
              todoret = todoret + "</table>"
              //}else{ toret='Error';} 
            }
            todoret =
              todoret +

              "\n<hr width='90%'><center><button style='background:#384959;color:white;' onclick='window.copytocb(`" +
              allcopy +
              "`);return true;'>复制 ID</button>&nbsp;<button id='showMorePopupBMAccsReqbtn' style='background:#384959;color:white;' onclick='window.showMorePopupBMAccsReq(`" +
              bmid +
              "`); return true;'>请求广告帐户</button>&nbsp;<button id='showMorePopupBMAccsAddbtn' style='background:#384959;color:white;' onclick='window.showMorePopupBMAccsAdd(`" +
              bmid +
              "`); return true;'>创建广告帐号</button></center><div id='showMorePopupBMAccsform'></div><div id='showMorePopupBMAccslog'></div>"
            window.showPluginPopup(event, todoret, "BM 广告帐号")
          },
        )
      }

      window.showMorePopupBMAccsRm = async function (accid, bmid) {
        if (
          confirm(
            "Are you sure you want to remove account " +
            accid +
            " from BM " +
            bmid +
            " ?",
          )
        ) {
          let apiUrl = "https://graph.facebook.com/v19.0/"
          let params
          params = `${bmid}/ad_accounts?access_token=${window.privateToken}`
          var urlencoded = new URLSearchParams()
          urlencoded.append("method", "delete")
          urlencoded.append("adaccount_id", accid)
          urlencoded.append("access_token", window.privateToken)
          let logNode = document.getElementById("showMorePopupBMAccslog")
          let response = await fetch(apiUrl + params, {
            mode: "cors",
            method: "POST",
            credentials: "include",
            redirect: "follow",
            body: urlencoded,
          })
          let json = await response.json()
          if (json.error !== undefined) {
            alert(json.error.message)
            logNode.innerHTML += "\n<br>" + json.error.message
            ///break; 
          } else {
            logNode.innerHTML += "\n<br>Done!"
          }
          await sleep(1000)
          window.showMorePopupBMAccs(bmid)
          //}
          function sleep(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms))
          }
        }
      }

      window.showMorePopupBMAccsAdd = function (bmid) {


        document.getElementById("showMorePopupBMAccsAddbtn").style.display =
          "none"
        document.getElementById("showMorePopupBMAccsReqbtn").style.display =
          "none"
        let addbmNode = document.getElementById("showMorePopupBMAccsform")
        let todo = ""
        todo = todo + '<table border="0.1">'

        todo =
          todo +
          '<tr><td><select style="background: #384959;color:white;" id="PrivateBMcnt">'
        var j = 1
        for (; j < 6; j++) {
          todo = todo + ("<option value='" + j + "'>" + j + "</option>'")
        }
        todo =
          todo +
          '</select><select style="background: #384959;color:white;" id="PrivateBMcurr"><option value="USD">USD</option><option value="EUR">EUR</option><option value="GBP">GBP</option><option value="PLN">PLN</option><option value="UAH">UAH</option></select><select style="background: #384959;color:white;" id="PrivateBMtz"><option value="137">TZ_EUROPE_KIEV</option><option value="106">TZ_EUROPE_WARSAW</option><option value="58">TZ_EUROPE_LONDON</option><option value="1">TZ_AMERICA_LOS_ANGELES</option></select></td></tr><tr><td><input type="text" id="PrivateBMname" placeholder="name_" style="background: #384959;color:white;" value="name_" maxlength="15" size="15"></tr></td><tr><td>Pixel:<input type="checkbox" id="BMAccAddpixel" value="" name="BMAccAddpixel"></td></tr><tr><td>Add Admin:<input type="checkbox" id="BMAccAddadmin" value="" name="BMAccAddadmin"></td></tr>'

        /* todo = todo + `<tr><td>永久：</td><td> <select style="background: #384959;color:white;" id="BMAccsReqrole"><option value="3">管理+</option><option value="2">广告+</option><option value="1">分析</option></select></td></tr> 
              <tr><td>AdAcc ID：</td><td> <input type="text" id="BMAccsReqId" style="background: #384959;color:白色；" maxlength="50" size="30" value="act_xxx"></td></tr>`; 
              */
        todo =
          todo +
          '<tr><td><input type="hidden" id="BMAccsAddbmid" name="BMAccsAddbmid" value="' +
          bmid +
          '" /></td></tr><tr><td style="text-align: center; vertical-align: middle;"><button style="background:#384959;color:white;" id="BMAccsAddBtn" onclick="window.showMorePopupBMAccsAddProcessForm(); return true;">Create Acc</button></td></tr></table>'
        addbmNode.innerHTML = "\n<br>" + todo
      }
      window.showMorePopupBMAccsAddProcessForm = async function () {
        let apiUrl = "https://graph.facebook.com/v19.0/"
        document.getElementById("BMAccsAddBtn").innerHTML = "等待..."
        //let bmel = document.getElementById("PrivateBM");
        //let bmoption= bmel.options[bmel.selectedIndex];
        // let privateBMowner=bmoption.getAttribute('data-owner');

        let privateBMAddpix = document.getElementById("BMAccAddpixel").checked
        let privateBMAddadmin = document.getElementById("BMAccAddadmin").checked
        let privateBM = document.getElementById("BMAccsAddbmid").value
        let privateBmName = document.getElementById("PrivateBMname").value
        let privateBmTz = document.getElementById("PrivateBMtz").value
        let privateBmCurr = document.getElementById("PrivateBMcurr").value
        let privateBmCount = document.getElementById("PrivateBMcnt").value
        //alert('ok');

        if (privateBMAddadmin == true) {
          let params2e = `me?fields=id,business_users.business(${privateBM})&access_token=${window.privateToken}`
          let response2e = await fetch(apiUrl + params2e, {
            mode: "cors",
            method: "GET",
            credentials: "include",
            redirect: "follow",
          })
          let json2e = await response2e.json()

          // console.log(json2e);

          try {
            if (json2e.business_users.data[0].id) {
              BMuidrole = json2e.business_users.data[0].id
            }
          } catch (e) {
            BMuidrole = 0
          }
        }

        for (let index = 1; index <= privateBmCount; index++) {
          let params = `${privateBM}/adaccount?fields=id,name,adtrust_dsl,account_id`
          //console.log(apiUrl + params);
          var urlencoded = new URLSearchParams()
          urlencoded.append("name", privateBmName + index)
          urlencoded.append("timezone_id", privateBmTz)
          urlencoded.append("currency", privateBmCurr)
          urlencoded.append("end_advertiser", "NONE")
          urlencoded.append("media_agency", "NONE")
          urlencoded.append("partner", "NONE")
          urlencoded.append("access_token", window.privateToken)
          let logNode = document.getElementById("showMorePopupBMAccslog")
          let response = await fetch(apiUrl + params, {
            mode: "cors",
            method: "POST",
            credentials: "include",
            redirect: "follow",
            body: urlencoded,
          })
          let json = await response.json()
          console.log(json)
          if (json.error !== undefined) {
            alert(json.error.message)
            logNode.innerHTML += "\n<br>" + json.error.message
            break
          } else {
            if (json.adtrust_dsl) {
              logNode.innerHTML +=
                "\n<br>" +
                json.name +
                " (" +
                json.id +
                ") [<b>" +
                json.adtrust_dsl +
                " &nbsp; " +
                privateBmCurr +
                "</b>]"

              if (BMuidrole > 0) {
                if (json.id != "null") {
                  let params3 = json.id + `/assigned_users`
                  var urlencoded3 = new URLSearchParams()
                  urlencoded3.append("access_token", window.privateToken)
                  urlencoded3.append("user", BMuidrole)
                  urlencoded3.append(
                    "tasks",
                    '["ANALYZE","ADVERTISE","MANAGE"]',
                  )
                  let response3 = await fetch(apiUrl + params3, {
                    mode: "cors",
                    method: "POST",
                    credentials: "include",
                    redirect: "follow",
                    body: urlencoded3,
                  })
                  let json3 = await response3.json()
                  console.log(json3)
                }
              }

              if (privateBMAddpix == true) {
                if (json.id != "null") {
                  let params2 = json.id + `/adspixels`
                  var urlencoded2 = new URLSearchParams()
                  urlencoded2.append("access_token", window.privateToken)
                  urlencoded2.append("name", json.id)
                  let response2 = await fetch(apiUrl + params2, {
                    mode: "cors",
                    method: "POST",
                    credentials: "include",
                    redirect: "follow",
                    body: urlencoded2,
                  })
                  let json2 = await response2.json()
                  console.log(json2)
                }
              }
            } else {
              logNode.innerHTML += "\n<br>" + json.id
            }
          }
          await sleep(3000)
        }
        window.showMorePopupBMAccs(privateBM)

        //}
        function sleep(ms) {
          return new Promise((resolve) => setTimeout(resolve, ms))
        }
      }

      window.showMorePopupBMAccsReq = function (bmid) {
        document.getElementById("showMorePopupBMAccsAddbtn").style.display =
          "none"
        document.getElementById("showMorePopupBMAccsReqbtn").style.display =
          "none"
        let addbmNode = document.getElementById("showMorePopupBMAccsform")
        let todo = ""
        todo = todo + '<table border="0.1">'

        todo = todo + ""
        todo =
          todo +
          `<tr><td>Perm:</td><td> <select style="background: #384959;color:white;" id="BMAccsReqrole"><option value="3">管理+</option><option value="2">广告+</option><option value="1">分析</option></select></td></tr> <tr> 
						<tr><td>AdAcc ID:</td><td> <input type="text" id="BMAccsReqId" style="background: #384959;color:white;"  maxlength="50" size="30" value="act_xxx"></td></tr>`

        todo =
          todo +
          '<tr><td><input type="hidden" id="BMAccsReqbmid" name="BMAccsReqbmid" value="' +
          bmid +
          '" /></td><td style="text-align: center; vertical-align: middle;"><button style="background:#384959;color:white;" id="BMAccsReqClaimBtn" onclick="window.showMorePopupBMAccsReqProcessForm(); return false;">领取账户</button></td></tr></table>'
        addbmNode.innerHTML = "\n<br>" + todo
      }
      window.showMorePopupBMAccsReqProcessForm = async function () {
        document.getElementById("BMAccsReqClaimBtn").innerHTML = "等待..."
        let apiUrl = "https://graph.facebook.com/v19.0/"
        let privateBMtype = document.getElementById("BMAccsReqrole").value
        let privateBM = document.getElementById("BMAccsReqbmid").value
        let privateBmNu = document.getElementById("BMAccsReqId").value
        let params
        params = `${privateBM}/client_ad_accounts`
        var urlencoded = new URLSearchParams()
        urlencoded.append("access_type", "AGENCY")
        urlencoded.append("adaccount_id", privateBmNu)
        if (privateBMtype == 1)
          urlencoded.append("permitted_tasks", '["ANALYZE"]')
        else {
          if (privateBMtype == 2)
            urlencoded.append(
              "permitted_tasks",
              '["ADVERTISE","ANALYZE","DRAFT"]',
            )
          else
            urlencoded.append(
              "permitted_tasks",
              '["ADVERTISE","ANALYZE","DRAFT","MANAGE"]',
            )
        }
        urlencoded.append("access_token", window.privateToken)
        let logNode = document.getElementById("showMorePopupBMAccslog")
        let response = await fetch(apiUrl + params, {
          mode: "cors",
          method: "POST",
          credentials: "include",
          redirect: "follow",
          body: urlencoded,
        })
        let json = await response.json()
        if (json.error !== undefined) {
          alert(json.error.error_user_msg)
          logNode.innerHTML += "\n<br>" + json.error.error_user_msg
          ///break;
        } else {
          logNode.innerHTML += "\n<br>完成!"
        }
        await sleep(1000)
        window.showMorePopupBMAccs(privateBM)
        //}
        function sleep(ms) {
          return new Promise((resolve) => setTimeout(resolve, ms))
        }
      }

      window.showMorePopupBMUsers = async function (bmid) {
        tmpapiurl =
          "https://graph.facebook.com/v19.0/" +
          bmid +
          "?fields=business_users{active_status,id,email,two_fac_status,pending_email,name,role,title,is_two_fac_blocked,was_integrity_demoted,sensitive_action_reviews},pending_users{id,role,email,status}&limit=100&access_token=" +
          window.privateToken
        var todoret = ""
        window.getJSON(
          tmpapiurl,
          await function (err, bminf) {
            if (err !== null) {
              alert("Something went wrong: " + err)
            } else {
              if (bminf.business_users.data.length) {
                // console.log(bminf);
                todoret =
                  todoret +
                  '<table border="0.1"><tr style="font-size: 12px;text-decoration: none;color: #7FB5DA;"><th>名称</th><th>角色</th><th>#</th></tr>'
                var i = 0
                for (; i < bminf.business_users.data.length; i++) {
                  try {
                    if (bminf.business_users.data[i].name) {
                      ///BMUname=`<a href='https://fb.com/${bminf.data[i].id}' target="_blank">`+bminf.data[i].name+'</a>';
                      BMUname = bminf.business_users.data[i].name

                    }
                  } catch (e) {
                    BMUname = "NA"
                  }
                  try {
                    if (bminf.business_users.data[i].role) {
                      BMUrole = bminf.business_users.data[i].role

                      switch (bminf.business_users.data[i].role) {
                        case "ADMIN":
                          BMUrole =
                            '<select onchange="showMorePopupBMUsersEdit(`' +
                            bminf.business_users.data[i].id +
                            "`,`" +
                            bmid +
                            '`)" style="background: #384959;color:white;" id="BMUserEditrole' +
                            bminf.business_users.data[i].id +
                            '"><option value="ADMIN">管理员</option><option value="EMPLOYEE">员工</option></select>'
                          break
                        default:
                          BMUrole = BMUrole =
                            '<select onchange="showMorePopupBMUsersEdit(`' +
                            bminf.business_users.data[i].id +
                            "`,`" +
                            bmid +
                            '`)" style="background: #384959;color:white;" id="BMUserEditrole' +
                            bminf.business_users.data[i].id +
                            '"><option value="EMPLOYEE">员工</option><option value="ADMIN">管理员</option></select>'
                          break
                      }
                    }
                  } catch (e) {
                    BMUrole = "NA"
                  }

                  todoret =
                    todoret +
                    ("<tr><td><b>" +
                      BMUname +
                      "</b></td> <td><center><b>" +
                      BMUrole +
                      "</b></center> " +
                      "</td><td><b><a onclick='window.showMorePopupBMUsersRm(`" +
                      bminf.business_users.data[i].id +
                      "`,`" +
                      bmid +
                      '`);\'><svg width="14" height="14" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v19.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fill="#000"/></svg></a></b></td></tr>')
                }
                try {
                  var i = 0
                  for (; i < bminf.pending_users.data.length; i++) {
                    try {
                      if (bminf.pending_users.data[i].email) {
                        ///BMUname=`<a href='https://fb.com/${bminf.data[i].id}' target="_blank">`+bminf.data[i].name+'</a>'; 
                        BMUname = bminf.pending_users.data[i].email
                      }
                    } catch (e) {
                      BMUname = "NA"
                    }
                    try {
                      if (bminf.pending_users.data[i].role) {
                        BMUrole = bminf.pending_users.data[i].role
                      }
                    } catch (e) {
                      BMUrole = "NA"
                    }

                    todoret =
                      todoret +
                      ("<tr><td><span style='color: yellow;'>" +
                        BMUname +
                        "</span></td> <td><center><b>待处理</b></center> " +
                        "</td><td><b><a onclick='window.showMorePopupBMUsersRm(`" +
                        bminf.pending_users.data[i].id +
                        "`,`" +
                        bmid +
                        '`);\'><svg width="14" height="14" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v19.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fill="#000"/></svg></a></b></td></tr>')
                  }
                } catch (e) {
                  console.log("0 个待处理用户..")
                }

                todoret = todoret + "</table>"
              } else {
                toret = "错误"
              }
            }
            todoret =
              todoret +
              "\n<hr width='90%'><center><button id='showMorePopupBMUsersAddbtn' style='background:#384959;color:white;' onclick='window.showMorePopupBMUsersAdd(`" +
              bmid +
              "`); return true;'>邀请用户</button></center><div id='showMorePopupBMUsersAddform'></div><div id='showMorePopupBMUsersAddlog'></div>"
            window.showPluginPopup(event, todoret, "BM 管理员")
          },
        )
      }

      window.showMorePopupBMUsersEdit = async function (userid, bmid) {
        let BMrole = document.getElementById("BMUserEditrole" + userid).value
        if (
          confirm(
            "您确定要将帐户角色更改为： " +
            BMrole +
            "？",
          )
        ) {
          let apiUrl = "https://graph.facebook.com/v19.0/"
          let params
          params = `${userid}?access_token=${window.privateToken}`
          var urlencoded = new URLSearchParams()
          urlencoded.append("method", "POST")
          urlencoded.append("role", BMrole)
          urlencoded.append("access_token", window.privateToken)

          let logNode = document.getElementById("showMorePopupBMUsersAddlog")
          let response = await fetch(apiUrl + params, {
            mode: "cors",
            method: "POST",
            credentials: "include",
            redirect: "follow",
            body: urlencoded,
          })
          let json = await response.json()
          if (json.error !== undefined) {
            alert(json.error.message)
            logNode.innerHTML += "\n<br>" + json.error.message
            ///break;
          } else {
            logNode.innerHTML += "\n<br>更新 BM 角色完成！"
          }
          await sleep(1000)
          window.showMorePopupBMUsers(bmid)
          //}
          function sleep(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms))
          }
        }
      }

      window.showMorePopupBMUsersRm = async function (userid, bmid) {
        let apiUrl = "https://graph.facebook.com/v19.0/"
        let params
        params = `${userid}?access_token=${window.privateToken}`
        var urlencoded = new URLSearchParams()
        urlencoded.append("method", "delete")
        urlencoded.append("access_token", window.privateToken)

        let logNode = document.getElementById("showMorePopupBMUsersAddlog")
        let response = await fetch(apiUrl + params, {
          mode: "cors",
          method: "POST",
          credentials: "include",
          redirect: "follow",
          body: urlencoded,
        })
        let json = await response.json()
        if (json.error !== undefined) {
          alert(json.error.message)
          logNode.innerHTML += "\n<br>" + json.error.message
          ///break;
        } else {
          logNode.innerHTML += "\n<br>完成!"
        }
        await sleep(2000)
        window.showMorePopupBMUsers(bmid)
        //}
        function sleep(ms) {
          return new Promise((resolve) => setTimeout(resolve, ms))
        }
      }
      window.showMorePopupBMUsersAdd = function (bmid) {
        document.getElementById("showMorePopupBMUsersAddbtn").style.display =
          "none"
        let addbmNode = document.getElementById("showMorePopupBMUsersAddform")
        let todo = ""
        todo = todo + '<table border="0.1">'

        todo = todo + ""
        todo =
          todo +
          `<tr><td>角色:</td><td> <select style="background: #384959;color:white;" id="BMUserAddrole"><option value="ADMIN">Admin</option><option value="EMPLOYEE">Employee</option></select></td></tr>
					  <tr><td>电子邮件：</td><td> <input type="text" id="BMUserAddemail" placeholder="mail" style="background: #384959;color:white;" maxlength="50" size="30" value="@gmail.com"></td></tr>`

        todo =
          todo +
          '<tr><td><input type="hidden" id="BMUserAddid" name="BMUserAddid" value="' +
          bmid +
          '" /></td><td style="text-align: center; vertical-align: middle;"><button style="background:#384959;color:white;" id="Tab5AddBMForm" onclick="window.showMorePopupBMUsersAddProcessForm(); return false;">邀请用户</button></td></tr></table>'
        addbmNode.innerHTML = "\n<br>" + todo
      }
      window.showMorePopupBMUsersAddProcessForm = async function () {
        let apiUrl = "https://graph.facebook.com/v19.0/"
        let privateBMtype = document.getElementById("BMUserAddrole").value
        let privateBM = document.getElementById("BMUserAddid").value
        let privateBmNu = document.getElementById("BMUserAddemail").value
        let params
        params = `${privateBM}/business_users`
        var urlencoded = new URLSearchParams()
        urlencoded.append("email", privateBmNu)
        if (privateBMtype == "ADMIN") urlencoded.append("role", "ADMIN")
        else urlencoded.append("role", "EMPLOYEE")
        urlencoded.append("access_token", window.privateToken)
        let logNode = document.getElementById("showMorePopupBMUsersAddlog")
        let response = await fetch(apiUrl + params, {
          mode: "cors",
          method: "POST",
          credentials: "include",
          redirect: "follow",
          body: urlencoded,
        })
        let json = await response.json()
        if (json.error !== undefined) {
          alert(json.error.message)
          logNode.innerHTML += "\n<br>" + json.error.message
          ///break; 
        } else {
          logNode.innerHTML += "\n<br>完成！"
        }
        await sleep(2000)
        window.showMorePopupBMUsers(privateBM)
        //}
        function sleep(ms) {
          return new Promise((resolve) => setTimeout(resolve, ms))
        }
      }

      window.showbmstatuspzrd = async function () {
        var bmlist = []
        var tabelements = document.getElementsByClassName("pzrdbmrow")
        for (var i = 0; i < tabelements.length; i++) {
          //console.log(tabelements[i].dataset.bmid);
          bmlist.push(tabelements[i].dataset.bmid)
        }

        console.log(bmlist)
        try {
          if (bmlist.length) {
            for (var ibm = 0; ibm < bmlist.length; ibm++) {
              console.log(bmlist[ibm])
              await window.PzrdBmList(bmlist[ibm])
            }
          }
        } catch (e) {
          console.log("没有用于 pzrd 检查的 BM")
        }
      }

      window.showbmstatus = async function () {
        // var pzrdbmcheck = await pluginDbgetKey('pzrdbm'); 
        tmpapiurl =
          "https://graph.facebook.com/v19.0/me/businesses?fields=id,is_disabled_for_integrity_reasons,can_use_extended_credit,name,timezone_id,verification_status,owned_ad_accounts.limit(100){account_status},client_ad_accounts.limit(500){account_status},owned_pages,client_pages,business_users,pending_users&limit=100&access_token=" +
          window.privateToken
        var bmpzrdcheck = []
        window.getJSON(tmpapiurl, function (err, bminf) {
          if (err !== null) {
            alert("出现问题： " + err)
          } else {
            //console.log(bminf.data); 

            if (bminf.data.length) {
              document.getElementById("tabhead5").innerHTML =
                "BM业务经理(" + bminf.data.length + ")"
              todo = "\n"
              todo =
                todo +
                '<table border="0.1"><tr style="font-size: 12px;text-decoration: none;color: #000;"><th>名称</th><th>状态</th><th>限额</th><th>广告户</th><th>主页</th><th>管理员</th><th></th><th><a class="close" style="transition: all 200ms;font-size: 24px;text-decoration: none;color: #000;cursor:progress" onclick="window.showbmstatuspzrd();return true;" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M14 12h-4v-12h4v12zm6.949-4.493l1.81-.857c-.353-.7-.758-1.368-1.236-1.981l-1.512 1.318c.36.474.667.986.938 1.52zm-.797-4.299c-.589-.54-1.214-1.038-1.9-1.454l-1.216 1.599c.577.334 1.104.739 1.602 1.177l1.514-1.322zm1.827 7.792h2.006c-.072-.861-.229-1.694-.473-2.493l-1.82.862c.144.527.23 1.074.287 1.631zm-1.895 6.919l1.539 1.29c.465-.616.871-1.276 1.211-1.976l-1.846-.787c-.259.519-.562 1.011-.904 1.473zm1.912-4.919c-.054.54-.162 1.063-.299 1.574l1.864.795c.224-.762.372-1.553.439-2.369h-2.004zm-3.258 6.403c-1.779 1.608-4.129 2.597-6.713 2.597-5.525 0-10.021-4.486-10.021-10 0-1.913.554-3.691 1.496-5.207l2.162 2.162 1.353-7.014-7.015 1.351 2.045 2.045c-1.287 1.904-2.045 4.191-2.045 6.663 0 6.627 5.385 12 12.025 12 3.204 0 6.107-1.259 8.264-3.297l-1.551-1.3z" fill="#000"/></svg></a></th></tr>'
              var i = 0
              for (; i < bminf.data.length; i++) {
                bmpzrdcheck.push(bminf.data[i].id)
                if (bminf.data[i].name) {
                  todo = todo + "<tr>"
                  bminf.data[i].name =
                    "<b id='fbaccstatusbm" +
                    bminf.data[i].id +
                    "' onclick='window.shadowtext(`fbaccstatusbm" +
                    bminf.data[i].id +
                    "`);return true;'>" +
                    bminf.data[i].name +
                    "</b>" +
                    "<b class='pzrdbmrow' data-bmid='" +
                    bminf.data[i].id +
                    "' id='fbaccstatusbmpzrd" +
                    bminf.data[i].id +
                    "'></b>"
                  if (bminf.data[i].verification_status) {
                    switch (bminf.data[i].verification_status) {
                      case "verified":
                        bmvstatus =
                          '<span style="color: red;">' +
                          bminf.data[i].name +
                          "</span>"
                        break
                      case "revoked":
                        bmvstatus =
                          '<span style="color: red;">' +
                          bminf.data[i].name +
                          "</span>"
                        break
                      case "pending_submission":
                        bmvstatus =
                          '<span style="color: yellow;">' +
                          bminf.data[i].name +
                          "</span>"
                        break
                      default:
                        bmvstatus = "" + bminf.data[i].name
                        break
                    }
                  }
                  if (bminf.data[i].is_disabled_for_integrity_reasons == true) {
                    bmdisstatus =
                      '&#128308;<span style="color: red;">异常</span>'
                  } else {
                    bmdisstatus = "&#128994;"
                    //bmdisstatus='<span style="color: green;" alt="alt">活动</span>'; 
                  }

                  if (bminf.data[i].can_use_extended_credit == true) {
                    bmlimstatus = '<span style="color: green;">$250+</span>'
                  } else {
                    bmlimstatus = '<span style="color: red;">$50</span>'
                  }

                  try {
                    if (bminf.data[i].owned_ad_accounts.data.length) {
                      ownacccnt = bminf.data[i].owned_ad_accounts.data.length
                    }
                  } catch (e) {
                    console.log("没有 BM 自己的帐户")
                    ownacccnt = 0
                  }

                  try {
                    if (bminf.data[i].client_ad_accounts.data.length) {
                      clientacccnt =
                        bminf.data[i].client_ad_accounts.data.length
                    }
                  } catch (e) {
                    console.log("没有 BM 客户端帐户")
                    clientacccnt = 0
                  }
                  acccnt = ownacccnt + clientacccnt

                  try {
                    if (bminf.data[i].owned_pages.data.length) {
                      ownfpcnt = bminf.data[i].owned_pages.data.length
                    }
                  } catch (e) {
                    console.log("No BM own pages")
                    ownfpcnt = 0
                  }

                  try {
                    if (bminf.data[i].client_pages.data.length) {
                      clientfpcnt = bminf.data[i].client_pages.data.length
                    }
                  } catch (e) {
                    console.log("没有 BM 客户端页面")
                    clientfpcnt = 0
                  }
                  fpcnt = ownfpcnt + clientfpcnt

                  try {
                    if (bminf.data[i].business_users.data.length) {
                      bmuserscnt = bminf.data[i].business_users.data.length
                    }
                  } catch (e) {
                    console.log("没有 BM 用户")
                    bmusers = 0
                  }

                  try {
                    if (bminf.data[i].pending_users.data.length) {
                      bmuserscnt =
                        bmuserscnt +
                        "+<span style='color: yellow;'>" +
                        bminf.data[i].pending_users.data.length +
                        "</span>"
                    }
                  } catch (e) {
                    console.log("没有 BM 待处理用户")
                    bmusers = 0
                  }

                  todo =
                    todo +
                    ("<td><b>" +
                      '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path d="M0 7v15h24v-15h-24zm22 13h-20v-6h6v-2h-6v-3h20v3h-6v2h6v6zm-13-15.5c0-.276.224-.5.5-.5h5c.276 0 .5.224.5.5v1.5h2v-2c0-1.104-.896-2-2-2h-6c-1.104 0-2 .896-2 2v2h2v-1.5zm5 6.5h-4v4h4v-4z" fill="#000"/></svg>&nbsp;' +
                      bmvstatus +
                      "</b></td> <td><center><b>" +
                      bmdisstatus +
                      "</b></center> " +
                      "</td><td><center><b>" +
                      bmlimstatus +
                      "</b></center> " +
                      "</td> <td><center><b>" +
                      acccnt +
                      "<a onclick='window.showMorePopupBMAccs(" +
                      bminf.data[i].id +
                      ");'>" +
                      '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" width="12" height="12" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m22 5c0-.478-.379-1-1-1h-18c-.62 0-1 .519-1 1v14c0 .621.52 1 1 1h18c.478 0 1-.379 1-1zm-1.5 13.5h-17v-13h17zm-6.065-9.978-5.917 5.921v-1.243c0-.414-.336-.75-.75-.75-.415 0-.75.336-.75.75v3.05c0 .414.335.75.75.75h3.033c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-1.219l5.918-5.922v1.244c0 .414.336.75.75.75s.75-.336.75-.75c0-.715 0-2.335 0-3.05 0-.414-.336-.75-.75-.75-.715 0-2.318 0-3.033 0-.414 0-.75.336-.75.75s.336.75.75.75z" fill-rule="nonzero" fill="#000"/></svg>' +
                      "</a></b></center> " +
                      "</td><td><center><b>" +
                      fpcnt +
                      "</b></center> " +
                      "</td><td><center><b>" +
                      bmuserscnt +
                      "<a onclick='window.showMorePopupBMUsers(" +
                      bminf.data[i].id +
                      ");'>" +
                      '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" width="12" height="12" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m22 5c0-.478-.379-1-1-1h-18c-.62 0-1 .519-1 1v14c0 .621.52 1 1 1h18c.478 0 1-.379 1-1zm-1.5 13.5h-17v-13h17zm-6.065-9.978-5.917 5.921v-1.243c0-.414-.336-.75-.75-.75-.415 0-.75.336-.75.75v3.05c0 .414.335.75.75.75h3.033c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-1.219l5.918-5.922v1.244c0 .414.336.75.75.75s.75-.336.75-.75c0-.715 0-2.335 0-3.05 0-.414-.336-.75-.75-.75-.715 0-2.318 0-3.033 0-.414 0-.75.336-.75.75s.336.75.75.75z" fill-rule="nonzero" fill="#000"/></svg>' +
                      "</a></b></center> " +
                      "</td><td><b><a href='https://business.facebook.com/settings/?business_id=" +
                      bminf.data[i].id +
                      '\' target=\'_blank\'><svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" viewBox="0 0 24 24" clip-rule="evenodd"><path d="M14 4h-13v18h20v-11h1v12h-22v-20h14v1zm10 5h-1v-6.293l-11.646 11.647-.708-.708 11.647-11.646h-6.293v-1h8v8z" fill="#000"/></svg></a></a></b></td>')
                  todo = todo + "<td></td></tr>"
                }
              }
              todo = todo + "</table>"
            } else {
              //window.appendtab('无 BM 帐户', "tab5"); 
              todo = "No BM accounts for display :("
            }
            todo =
              todo +

              "\n<hr width='90%'><center><button id='showAddBMbtn' style='background:#384959;color:white;' onclick='window.showAddBM(); return true;'>很棒的新 BM</button></center>"

            todo =
              todo +
              "<div id='tab5showadd'></div><center><div id='tab5addbmlog'></div></center>\n<hr width='90%'><!--<center>其他 BM 状态查询</center>\n<center><form id='bmstatlookup'><input type=text id='bmlookid'><button style='background:#384959;color:white;' id='bmlooksubmit' onclick='window.checkBmFunc(); return false;'>获取信息</button></form></center>-->"
            todo =
              todo +
              '<div id="bmrestablediv" style="display:none;"><table id="bmrestableid" border="0.1"><tr><th>#</th><th>名称</th><th>状态</th><th>限额</th></tr></table></div>'
            window.appendtab(todo, "tab5")

            //if(pzrdbmcheck == 1){ 
            //window.showbmstatuspzrd(bmpzrdcheck); 
            //} } 
          }
        })
      }
      window.showaccstatusedit = function (accid) {
        document.getElementById("fbaccstatusaccnoedit" + accid).style.display =
          "none"
        document.getElementById("fbaccstatusaccedit" + accid).style.display =
          "block"
      }
      window.showaccstatusupdatename = async function (accid) {
        getNewName = document.getElementById("Tab3Accname" + accid).value
        let apiUrl = "https://graph.facebook.com/v19.0/"
        let editaccid = accid
        let params = `${editaccid}?fields=id,name`
        var urlencoded = new URLSearchParams()
        urlencoded.append("name", getNewName)
        urlencoded.append("access_token", window.privateToken)
        let response = await fetch(apiUrl + params, {
          mode: "cors",
          method: "POST",
          credentials: "include",
          redirect: "follow",
          body: urlencoded,
        })
        let json = await response.json()
        //console.log(json);
        if (json.error !== undefined) {
          alert(json.error.error_user_msg)
          document.getElementById("fbaccstatusaccedit" + accid).style.display =
            "none"
          document.getElementById(
            "fbaccstatusaccnoedit" + accid,
          ).style.display = "block"
        } else {
          document.getElementById(
            "fbaccstatusaccnoedit" + accid,
          ).style.display = "block"
          document.getElementById("fbaccstatusaccedit" + accid).style.display =
            "none"
          //Reload
          // window.mainreload();
          window.adstabselect(3)
        }
      }

      window.showaccstatus = async function (showmode) {
        if (showmode == "ligth")
          tmpapiurl =
            "https://graph.facebook.com/v19.0/me/adaccounts?fields=id,account_id,business,owner,name,adtrust_dsl,currency,account_status,balance,current_unbilled_spend,amount_spent,account_currency_ratio_to_usd,users,user_role,assigned_partners,adspaymentcycle,insights.fields(spend).date_preset(today),ads.limit(1000){effective_status},is_tier_0,is_tier_1,is_tier_0_full,is_tier_restricted&limit=1000&sort=name_ascending&access_token=" +
            window.privateToken
        else
          tmpapiurl =
            "https://graph.facebook.com/v19.0/me/adaccounts?fields=id,account_id,business,owner,name,adtrust_dsl,currency,account_status,balance,current_unbilled_spend,amount_spent,account_currency_ratio_to_usd,users,user_role,assigned_partners,adspaymentcycle,insights.fields(spend).date_preset(today),ads.limit(1000){effective_status},funding_source_details,is_tier_0,is_tier_1,is_tier_0_full,is_tier_restricted&limit=1000&sort=name_ascending&access_token=" +
            window.privateToken
        // tmpapiurl='https://graph.facebook.com/v19.0/me/adaccounts?fields=id,account_id,business,owner,name,adtrust_dsl,currency,account_status,balance,current_unbilled_spend,amount_spent,account_currency_ratio_to_usd,users,user_role,assigned_partners,adspaymentcycle,insights{today_spend},ads.limit(1000){effective_status},is_tier_0,is_tier_1,is_tier_0_full,is_tier_restricted&limit=1000&sort=name_ascending&access_token='+window.privateToken;
        todo = "\n"
        var allcopy = ""
        let convertusd = await pluginDbgetKey("convert")
        window.getJSON(tmpapiurl, function (err, bminf) {
          if (err !== null) {
            alert("Something went wrong. Im trying a light version.. ")
            window.showaccstatus("ligth")
          } else {
            //alert(bminf.data.length);
            //console.log(bminf.accounts.data);
            //try {

            if (bminf.data.length) {
              document.getElementById("tabhead3").innerHTML =
                "广告户(" + bminf.data.length + ")"
              todo = "\n"
              //todo =``;
              todo =
                todo +
                '<table border="0.1"><tr style="font-size: 12px;text-decoration: none;color: #000;"><th>名称</th><th>状态</th><th>限额</th><th>广告</th><th>今日花费</th><th>付款门槛</th><th>花费</th><th class="getAccfullcl" style="display:none">等级</th><th class="getAccfullcl" style="display:none">信用卡</th><th class="getAccfullcl" style="display:none">用户</th><th class="getAccfullcl" style="display:none">所有者</th><th><a class="close" style="transition: all 200ms;font-size: 34px;text-decoration: none;color: #000;cursor:progress" onclick="window.adstabselect(3);return true;" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.944 12.979c-.489 4.509-4.306 8.021-8.944 8.021-2.698 0-5.112-1.194-6.763-3.075l1.245-1.633c1.283 1.645 3.276 2.708 5.518 2.708 3.526 0 6.444-2.624 6.923-6.021h-2.923l4-5.25 4 5.25h-3.056zm-15.864-1.979c.487-3.387 3.4-6 6.92-6 2.237 0 4.228 1.059 5.51 2.698l1.244-1.632c-1.65-1.876-4.061-3.066-6.754-3.066-4.632 0-8.443 3.501-8.941 8h-3.059l4 5.25 4-5.25h-2.92z" fill="#000"/></svg></a></th><th id="getAccfull" class="getAccfullcInactive"><a onclick="window.showMorePopupAccFull()"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-toggle-off" viewBox="0 0 16 16"> <path d="M11 4a4 4 0 0 1 0 8H8a4.992 4.992 0 0 0 2-4 4.992 4.992 0 0 0-2-4h3zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5z" fill="#7FB5DA"/> </svg></a></th></tr>'
              var i = 0
              var iads_active_total = 0
              var iads_error_total = 0
              var iads_pause_total = 0
              var todayspent_total = 0
              var allspent_total = 0
              var billsp_total = 0
              for (; i < bminf.data.length; i++) {
                if (bminf.data[i].name) {
                  todo = todo + "<tr>"
                  allcopy += bminf.data[i].account_id + ","

                  bminf.data[i].name =
                    '<div id="fbaccstatusaccnoedit' +
                    bminf.data[i].id +
                    '" style="display:block;"><a onclick="window.showaccstatusedit(`' +
                    bminf.data[i].id +
                    '`);return true;"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path d="M1.439 16.873l-1.439 7.127 7.128-1.437 16.873-16.872-5.69-5.69-16.872 16.872zm4.702 3.848l-3.582.724.721-3.584 2.861 2.86zm15.031-15.032l-13.617 13.618-2.86-2.861 10.825-10.826 2.846 2.846 1.414-1.414-2.846-2.846 1.377-1.377 2.861 2.86z" fill="#000"/></svg></a>' +
                    "<b id='fbaccstatusacc" +
                    bminf.data[i].id +
                    "' onclick='window.copytocb(`" +
                    bminf.data[i].account_id +
                    "`);return true;'>" +
                    bminf.data[i].name +
                    "</b></div>" +
                    '<div id="fbaccstatusaccedit' +
                    bminf.data[i].id +
                    '" style="display:none;"><input type="text" id="Tab3Accname' +
                    bminf.data[i].id +
                    '" style="background: #384959;color:white;"  maxlength="50" size="15" value="' +
                    bminf.data[i].name +
                    '"><a onclick="window.showaccstatusupdatename(`' +
                    bminf.data[i].id +
                    '`);return true;"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path d="M15.563 22.282l-3.563.718.72-3.562 2.843 2.844zm-2.137-3.552l2.845 2.845 7.729-7.73-2.845-2.845-7.729 7.73zm-2.426-9.73h2.996v-5h-2.996v5zm-.636 12h-8.364v-18h3v9h12v-9h.172l2.828 2.829v3.545l2-1.999v-2.375l-4-4h-18v22h9.953l.411-2zm-3.364-18h8v7h-8v-7z" fill="#000"/></svg></a></div>'

                  BMOwner = "NA"
                  goremacc = ""
                  try {
                    BMOwner =
                      "<a href='https://business.facebook.com/settings/ad-accounts/?business_id=" +
                      bminf.data[i].business.id +
                      "' target='_blank'>" +
                      '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path d="M0 7v15h24v-15h-24zm22 13h-20v-6h6v-2h-6v-3h20v3h-6v2h6v6zm-13-15.5c0-.276.224-.5.5-.5h5c.276 0 .5.224.5.5v1.5h2v-2c0-1.104-.896-2-2-2h-6c-1.104 0-2 .896-2 2v2h2v-1.5zm5 6.5h-4v4h4v-4z" fill="#000"/></svg></a>&nbsp;' +
                      bminf.data[i].business.name
                  } catch (e) {
                    // console.log('Personal?');
                    // console.log(bminf.client_ad_accounts.data[i].owner);
                    if (bminf.data[i].owner) {
                      BMOwner =
                        '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path d="M23.995 24h-1.995c0-3.104.119-3.55-1.761-3.986-2.877-.664-5.594-1.291-6.584-3.458-.361-.791-.601-2.095.31-3.814 2.042-3.857 2.554-7.165 1.403-9.076-1.341-2.229-5.413-2.241-6.766.034-1.154 1.937-.635 5.227 1.424 9.025.93 1.712.697 3.02.338 3.815-.982 2.178-3.675 2.799-6.525 3.456-1.964.454-1.839.87-1.839 4.004h-1.995l-.005-1.241c0-2.52.199-3.975 3.178-4.663 3.365-.777 6.688-1.473 5.09-4.418-4.733-8.729-1.35-13.678 3.732-13.678 4.983 0 8.451 4.766 3.732 13.678-1.551 2.928 1.65 3.624 5.09 4.418 2.979.688 3.178 2.143 3.178 4.663l-.005 1.241zm-13.478-6l.91 2h1.164l.92-2h-2.994zm2.995 6l-.704-3h-1.615l-.704 3h3.023z" fill="#000"/></svg>&nbsp;' +
                        bminf.data[i].owner
                      goremacc =
                        "<a onclick='window.remadacc(`" +
                        bminf.data[i].account_id +
                        "`,`" +
                        window.socid +
                        "`);'>" +
                        '<svg clip-rule="evenodd" fill-rule="evenodd" width="14" height="14" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 1.5c-4.69 0-8.497 3.807-8.497 8.497s3.807 8.498 8.497 8.498 8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497zm0 7.425 2.717-2.718c.146-.146.339-.219.531-.219.404 0 .75.325.75.75 0 .193-.073.384-.219.531l-2.717 2.717 2.727 2.728c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.384-.073-.53-.219l-2.729-2.728-2.728 2.728c-.146.146-.338.219-.53.219-.401 0-.751-.323-.751-.75 0-.192.073-.384.22-.531l2.728-2.728-2.722-2.722c-.146-.147-.219-.338-.219-.531 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" fill-rule="nonzero" fill="#000"/></svg>' +
                        "</a>"
                    } else BMOwner = "NA"
                  }
                  if (bminf.data[i].account_status) {
                    switch (bminf.data[i].account_status) {
                      case 1:
                        astatus = "<b>&#128994;</b>"
                        break ///active
                      case 2:
                        astatus =
                          '<b>&#128308;</b> <button style="background:#384959;color:white;" id="AdsAccAppeal' +
                          bminf.data[i].account_id +
                          '" onclick="window.appealadsacc(`' +
                          bminf.data[i].account_id +

                          '`); return false;">申诉</button>'
                        break //已禁用
                      case 3:
                        astatus = "<b>&#128992;</b><br/>异常"
                        break
                      case 7:
                        astatus = "PENDING_RISK_REVIEW"
                        break
                      case 8:
                        astatus = "PENDING_SETTLEMENT"
                        break
                      case 9:
                        astatus = "IN_GRACE_PERIOD"
                        break
                      case 100:
                        astatus = "<b>&#128683;</b><small>PENDING_CLOSE</small>"
                        break
                      case 101:
                        astatus = "<b>&#128683;</b>CLOSED"
                        break
                      case 201:
                        astatus = "ANY_ACTIVE"
                        break
                      case 202:
                        astatus = "ANY_CLOSED"
                        break
                      default:
                        astatus = "UNKNOWN " + bminf.data[i].account_status
                        break
                    }
                    //todo = todo + ("帐户状态：" + astatus + "\n<br>"); 
                    bmdisstatus = astatus
                  }

                  try {
                    if (bminf.data[i].is_tier_0 == true) {
                      acctier = "T0"
                    } else if (bminf.data[i].is_tier_1 == true) {
                      acctier = "T1"
                    } else if (bminf.data[i].is_0_full == true) {
                      acctier = "T0 Full"
                    } else {
                      acctier = "na"
                    }
                  } catch (e) {
                    acctier = "na"
                  }

                  acctier =
                    acctier +
                    "<a onclick='window.showMorePopupAccCap(`" +
                    bminf.data[i].account_id +
                    "`);'>" +
                    '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" width="12" height="12" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m22 5c0-.478-.379-1-1-1h-18c-.62 0-1 .519-1 1v14c0 .621.52 1 1 1h18c.478 0 1-.379 1-1zm-1.5 13.5h-17v-13h17zm-6.065-9.978-5.917 5.921v-1.243c0-.414-.336-.75-.75-.75-.415 0-.75.336-.75.75v3.05c0 .414.335.75.75.75h3.033c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-1.219l5.918-5.922v1.244c0 .414.336.75.75.75s.75-.336.75-.75c0-.715 0-2.335 0-3.05 0-.414-.336-.75-.75-.75-.715 0-2.318 0-3.033 0-.414 0-.75.336-.75.75s.336.75.75.75z" fill-rule="nonzero" fill="#7FB5DA"/></svg></a>'

                  /* try { 
                if(bminf.data[i].capabilities.includes("ADS_TRUST_TIER_0")){
                  acctier=acctier+'T0';}
               } catch (e) {console.log("no t0 in capabilities");}
               
               try { 
               if(bminf.data[i].capabilities.includes("СTW_ADS_TRUSTED_TIER_2_PLUS_ADVERTISER")){
                 acctier=acctier+'T2+';}
              } catch (e) {console.log("no t2 in capabilities");}
              try { 
               if(bminf.data[i].capabilities.includes("СTW_ADS_TRUSTED_TIER_2_ADVERTISER")){
                 acctier=acctier+'T2';}
              } catch (e) {console.log("no t2 in capabilities");}
              */

                  if (
                    window.currency_symbols[bminf.data[i].currency] !==
                    undefined
                  ) {
                    currency_symbol =
                      window.currency_symbols[bminf.data[i].currency]
                  } else {
                    currency_symbol = bminf.data[i].currency
                  }

                  if (bminf.data[i].adtrust_dsl) {
                    if (bminf.data[i].adtrust_dsl == -1) {
                      slimit = "不限额"
                    } else {
                      if (convertusd == 1 && bminf.data[i].currency != "USD") {
                        slimit =
                          "$" +
                          Math.round(
                            bminf.data[i].adtrust_dsl /
                            bminf.data[i].account_currency_ratio_to_usd,
                          ) +
                          "(" +
                          currency_symbol +
                          ")"
                        ///console.log(bminf.data[i].adtrust_dsl);
                        ///console.log(bminf.data[i].account_currency_ratio_to_usd);
                      } else {
                        slimit =
                          currency_symbol +
                          Math.round(bminf.data[i].adtrust_dsl)
                      }
                    }
                    bmlimstatus = slimit
                  }

                  if (bminf.data[i].amount_spent > 0) {
                    if (convertusd == 1 && bminf.data[i].currency != "USD") {
                      //allspent='$'+Math.round((bminf.data[i].amount_spent/100)/bminf.data[i].account_currency_ratio_to_usd);
                      allspent = Math.round(
                        bminf.data[i].amount_spent /
                        100 /
                        bminf.data[i].account_currency_ratio_to_usd,
                      )
                      allspent_total +=
                        bminf.data[i].amount_spent /
                        100 /
                        bminf.data[i].account_currency_ratio_to_usd
                      //console.log(bminf.data[i].adtrust_dsl);
                      //console.log(bminf.data[i].account_currency_ratio_to_usd);
                    } else {
                      //allspent=currency_symbol+(bminf.data[i].amount_spent/100);
                      allspent = Math.round(bminf.data[i].amount_spent / 100)
                      allspent_total +=
                        bminf.data[i].amount_spent /
                        100 /
                        bminf.data[i].account_currency_ratio_to_usd
                    }
                  } else {
                    allspent = 0
                  }

                  try {
                    if (bminf.data[i].insights.data[0].spend > 0) {
                      if (convertusd == 1 && bminf.data[i].currency != "USD") {
                        //todayspent='$'+Math.round(parseInt(bminf.data[i].insights.data[0].today_spend)/bminf.data[i].account_currency_ratio_to_usd);

                        todayspent =
                          "$" +
                          Math.round(
                            parseInt(bminf.data[i].insights.data[0].spend) /
                            bminf.data[i].account_currency_ratio_to_usd,
                          )
                        allspent =
                          allspent +
                          Math.round(
                            parseInt(bminf.data[i].insights.data[0].spend) /
                            bminf.data[i].account_currency_ratio_to_usd,
                          )
                        allspent_total += Math.round(
                          parseInt(bminf.data[i].insights.data[0].spend) /
                          bminf.data[i].account_currency_ratio_to_usd,
                        )
                        todayspent_total +=
                          parseInt(bminf.data[i].insights.data[0].spend) /
                          bminf.data[i].account_currency_ratio_to_usd
                        //console.log(bminf.data[i].adtrust_dsl);
                        //console.log(bminf.data[i].account_currency_ratio_to_usd);
                      } else {
                        todayspent =
                          currency_symbol +
                          Math.round(
                            parseInt(bminf.data[i].insights.data[0].spend),
                          )
                        todayspent_total +=
                          parseInt(bminf.data[i].insights.data[0].spend) /
                          bminf.data[i].account_currency_ratio_to_usd
                        allspent =
                          allspent +
                          parseInt(bminf.data[i].insights.data[0].spend)
                        allspent_total +=
                          parseInt(bminf.data[i].insights.data[0].spend) /
                          bminf.data[i].account_currency_ratio_to_usd
                      }
                    } else {
                      todayspent = currency_symbol + 0
                    }
                  } catch (e) {
                    todayspent = 0
                  }
                  /*try { 
                 if (bminf.data[i].ads_posts.data.length>0) { 
                fpadscount='<span style="color: green;">'+bminf.data[i].ads_posts.data.length+'</span>'; 
                 } else { 
                fpadscount=''+bminf.data[i].ads_posts.data.length+''; 
                 }		 
               }catch (e) {console.log("FP 没有 ADS :(");fpadscount=0;}   
               */
                  try {
                    if (bminf.data[i].users.data.length > 0) {
                      adsusrcount = bminf.data[i].users.data.length + ""
                    } else {
                      adsusrcount = "NA"
                    }
                  } catch (e) {
                    console.log("没有 AdsAcc 用户？")


                    adsusrcount = 0
                  }

                  if (bminf.data[i].current_unbilled_spend.amount) {
                    try {
                      if (
                        bminf.data[i].adspaymentcycle.data[0].threshold_amount >
                        0
                      ) {
                        if (
                          convertusd == 1 &&
                          bminf.data[i].currency != "USD"
                        ) {
                          billlim =
                            "$" +
                            Math.round(
                              bminf.data[i].adspaymentcycle.data[0]
                                .threshold_amount /
                              100 /
                              bminf.data[i].account_currency_ratio_to_usd,
                            )
                        } else {
                          billlim =
                            currency_symbol +
                            bminf.data[i].adspaymentcycle.data[0]
                              .threshold_amount /
                            100
                        }
                      }
                    } catch (e) {
                      billlim = "na"
                    }
                  }
                  if (
                    bminf.data[i].current_unbilled_spend.amount_in_hundredths >
                    0
                  ) {
                    if (convertusd == 1 && bminf.data[i].currency != "USD") {
                      billsp =
                        "$" +
                        Math.round(
                          parseInt(
                            bminf.data[i].current_unbilled_spend
                              .amount_in_hundredths,
                          ) /
                          100 /
                          bminf.data[i].account_currency_ratio_to_usd,
                        )
                      billsp_total +=
                        parseInt(
                          bminf.data[i].current_unbilled_spend
                            .amount_in_hundredths,
                        ) /
                        100 /
                        bminf.data[i].account_currency_ratio_to_usd
                    } else {
                      billsp =
                        currency_symbol +
                        parseInt(
                          bminf.data[i].current_unbilled_spend
                            .amount_in_hundredths,
                        ) /
                        100
                      billsp_total +=
                        parseInt(
                          bminf.data[i].current_unbilled_spend
                            .amount_in_hundredths,
                        ) /
                        100 /
                        bminf.data[i].account_currency_ratio_to_usd
                    }
                  } else billsp = currency_symbol + 0

                  //console.log(bminf.data[i].name);
                  //console.log(bminf.data[i].ads.data.length);

                  /*if(convertusd==1&&bminf.data[i].currency!='USD') {
               allspent='$'+allspent;
               }else{
               allspent=currency_symbol+(allspent);	
               }*/

                  try {
                    if (bminf.data[i].funding_source_details.id > 0) {
                      ccinf =
                        bminf.data[i].funding_source_details.display_string

                      try {
                        ccinf = ccinf.replace("VISA", "")
                        ccinf = ccinf.replace("Mastercard", "")
                        ccinf = ccinf.replace("Available Balance", "Prep")
                        ccinf = ccinf.replace("monthly invoicing", "AG")
                      } catch (e) { }
                    }
                  } catch (e) {
                    /*ccinf=`[<a onclick="window.showMorePopupAddCC(${bminf.data[i].account_id});">添加</a>]`;*/ ccinf =
                      "n/a"
                  }

                  try {
                    if (bminf.data[i].ads.data.length > 0) {
                      var iads_active = 0
                      var iads_error = 0
                      var iads_pause = 0
                      for (
                        var iads = 0;
                        iads < bminf.data[i].ads.data.length;
                        iads++
                      ) {
                        switch (bminf.data[i].ads.data[iads].effective_status) {
                          case "ACTIVE":
                            iads_active += 1
                            iads_active_total += 1
                            break
                          case "CAMPAIGN_PAUSED":
                            iads_pause += 1
                            iads_pause_total += 1
                            break
                          case "ADSET_PAUSED":
                            iads_pause += 1
                            iads_pause_total += 1
                            break
                          case "IN_PROCESS":
                            iads_pause += 1
                            iads_pause_total += 1
                            break
                          case "PAUSED":
                            iads_pause += 1
                            iads_pause_total += 1
                            break
                          case "DISAPPROVED":
                            iads_error += 1
                            iads_error_total += 1
                            break
                          case "WITH_ISSUES":
                            iads_error += 1
                            iads_error_total += 1
                            break
                        }

                        //console.log(bminf.data[i].ads.data[iads]);
                      }
                      ///adscnt=iads_active+'+'+iads_pause+'+'+iads_error;
                      if (convertusd == 1 && bminf.data[i].currency != "USD") {
                        allspent = "$" + Math.round(allspent)
                      } else allspent = currency_symbol + Math.round(allspent)

                      var adscnt = ""
                      if (iads_active > 0)
                        adscnt +=
                          '<b style="color:green;">' + iads_active + "</b>"
                      if (iads_pause > 0 && adscnt == "")
                        adscnt +=
                          '<b style="color:gray;">' + iads_pause + "</b>"
                      else {
                        if (iads_pause > 0)
                          adscnt +=
                            '+<b style="color:gray;">' + iads_pause + "</b>"
                      }
                      if (iads_error > 0 && adscnt == "")
                        adscnt += '<b style="color:red;">' + iads_error + "</b>"
                      else {
                        if (iads_error > 0)



                          adscnt +=
                            '+<b style="color:red;">' + iads_error + "</b>"
                      }
                      adscnt =
                        "" +
                        adscnt +
                        "<a onclick='window.showMorePopupAccAds(`" +
                        bminf.data[i].account_id +
                        "`);'>" +
                        '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" width="12" height="12" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m22 5c0-.478-.379-1-1-1h-18c-.62 0-1 .519-1 1v14c0 .621.52 1 1 1h18c.478 0 1-.379 1-1zm-1.5 13.5h-17v-13h17zm-6.065-9.978-5.917 5.921v-1.243c0-.414-.336-.75-.75-.75-.415 0-.75.336-.75.75v3.05c0 .414.335.75.75.75h3.033c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-1.219l5.918-5.922v1.244c0 .414.336.75.75.75s.75-.336.75-.75c0-.715 0-2.335 0-3.05 0-.414-.336-.75-.75-.75-.715 0-2.318 0-3.033 0-.414 0-.75.336-.75.75s.336.75.75.75z" fill-rule="nonzero" fill="#7FB5DA"/></svg></a>'
                    }
                  } catch (e) {
                    adscnt = "0"
                  }

                  godelacc =
                    "<b><a onclick='window.deladacc(`" +
                    bminf.data[i].account_id +
                    '`);\'><svg width="14" height="14" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v19.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fill="#000"/></svg></a></b>'

                  const returnText = function (text) {
                    return text || "无效"
                  }

                  todo =
                    todo +
                    ("<td><b>" +
                      bminf.data[i].name +
                      "</b></td> <td><center><b>" +
                      bmdisstatus +
                      "</b></center> " +
                      "</td><td><center><b>" +
                      bmlimstatus +
                      "</b></center></td><td><center><b>" +
                      adscnt +
                      "</b></center></td><td><center><b>" +
                      todayspent +


                      "</b></center></td><td><center><b>" +
                      billsp +
                      "</b>/<b>" +
                      billlim +
                      "</b></center><td><center><b>" +
                      returnText(allspent) +
                      "</b></center> " +
                      "</td><td class='getAccfullcl' style='display:none'><center>" +
                      acctier +
                      "</center></td><td class='getAccfullcl' style='display:none'><center><small>" +
                      ccinf +
                      "</small></center></td><td class='getAccfullcl' style='display:none'>" +
                      adsusrcount +
                      "</td><td class='getAccfullcl' style='display:none'>" +
                      BMOwner +
                      "</td><td>" +
                      goremacc +
                      godelacc +
                      "&nbsp;<b><a href='https://www.facebook.com/adsmanager/manage/campaigns?act=" +
                      bminf.data[i].account_id +
                      '\' target=\'_blank\'><svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" viewBox="0 0 24 24" clip-rule="evenodd"><path d="M14 4h-13v18h20v-11h1v12h-22v-20h14v1zm10 5h-1v-6.293l-11.646 11.647-.708-.708 11.647-11.646h-6.293v-1h8v8z" fill="#000"/></svg></a></b></td><td></td>')
                  todo = todo + "</tr>"
                }
              }
              ///计算总计
              var adscnt_total = ""
              if (iads_active_total > 0)
                adscnt_total +=
                  '<b style="color:green;">' + iads_active_total + "</b>"
              if (iads_pause_total > 0 && adscnt_total == "")
                adscnt_total +=
                  '<b style="color:gray;">' + iads_pause_total + "</b>"
              else {
                if (iads_pause_total > 0)
                  adscnt_total +=
                    '+<b style="color:gray;">' + iads_pause_total + "</b>"
              }
              if (iads_error_total > 0 && adscnt_total == "")
                adscnt_total +=
                  '<b style="color:red;">' + iads_error_total + "</b>"
              else {
                if (iads_error_total > 0)
                  adscnt_total +=
                    '+<b style="color:red;">' + iads_error_total + "</b>"
              }
              allspent_total = "$" + Math.round(allspent_total)
              todayspent_total = "$" + Math.round(todayspent_total)
              billsp_total = "$" + Math.round(billsp_total)
              todo =
                todo +
                ("<tr style='color:#000'><td><a onclick='window.copytocb(`" +
                  allcopy +
                  "`);return true;'>Total</a></td> <td><center><b></b></center> " +
                  "</td><td><center><b></b></center></td><td><center><b>" +
                  adscnt_total +
                  "</b></center></td><td><center><b>" +
                  todayspent_total +
                  "</b></center></td><td><center><b>" +
                  billsp_total +
                  " </b></center><td><center><b>" +
                  allspent_total +
                  "</b></center> " +
                  "</td><td></td>")
              todo = todo + "</tr>"
              todo = todo + "</table>"
            } else {
              //window.appendtab('没有 BM 账户', "tab5"); 
              todo = "No ads accounts for display :("
            }
            //}catch (e) {console.log("没有可供展示的 AdsAcc 帐户:(");} 
            //todo = todo + "\n<hr width='90%'><center><button id='showAddFPbtn' style='background:#384959;color:white;' onclick='window.showAddFP(); return true;'>Greate new FP</button></center>"; 
            //todo = todo + "<div id='tab4showadd'></div><center><div id='tab4addfplog'></div></center>\n<hr width='90%'>"; 
            todo = todo + ""
            window.appendtab(todo, "tab3")
          }
        })
      }
      window.showfpstatus = async function () {
        let pzrdfpcheck = await pluginDbgetKey("pzrdfp")
        /* if(pzrdfpcheck == 1){*/
        //pzrdlist= await window.PzrdFPList();
        try {
          pzrdlist = await window.PzrdFPList()
        } catch (e) {
          pzrdlist = { pzrdid: [], banid: [] }
          console.log("Error get pzrd/ban fp list")
        }
        /*} else{ 
     pzrdlist=[]; 
   }*/
        tmpapiurl =
          "https://graph.facebook.com/v19.0/me?fields=accounts.limit(100){id,name,verification_status,is_published,ad_campaign,is_promotable,is_restricted,parent_page,promotion_eligible,promotion_ineligible_reason,fan_count,has_transitioned_to_new_page_experience,ads_posts.limit(100),picture,roles}&access_token=" +





          window.privateToken
        todo = "\n"
        window.getJSON(
          tmpapiurl,
          await function (err, bminf) {
            if (err !== null) {
              alert("出现错误： " + err)
            } else {
              //console.log(bminf.accounts.data); 
              try {
                if (bminf.accounts.data.length) {
                  document.getElementById("tabhead4").innerHTML =
                    "公共主页(" + bminf.accounts.data.length + ")"
                  todo = "\n"
                  todo =
                    todo +
                    '<table border="0.1"><tr style="font-size: 12px;text-decoration: none;color: #000;"><th>名称</th><th>状态</th><th>喜欢</th><th>广告</th><th>用户</th><th>评论</th><th></th><th><a class="close" style="transition: all 200ms;font-size: 24px;text-decoration: none;color: #000;cursor:progress" onclick="window.getFpComments();return true;" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M14 12h-4v-12h4v12zm6.949-4.493l1.81-.857c-.353-.7-.758-1.368-1.236-1.981l-1.512 1.318c.36.474.667.986.938 1.52zm-.797-4.299c-.589-.54-1.214-1.038-1.9-1.454l-1.216 1.599c.577.334 1.104.739 1.602 1.177l1.514-1.322zm1.827 7.792h2.006c-.072-.861-.229-1.694-.473-2.493l-1.82.862c.144.527.23 1.074.287 1.631zm-1.895 6.919l1.539 1.29c.465-.616.871-1.276 1.211-1.976l-1.846-.787c-.259.519-.562 1.011-.904 1.473zm1.912-4.919c-.054.54-.162 1.063-.299 1.574l1.864.795c.224-.762.372-1.553.439-2.369h-2.004zm-3.258 6.403c-1.779 1.608-4.129 2.597-6.713 2.597-5.525 0-10.021-4.486-10.021-10 0-1.913.554-3.691 1.496-5.207l2.162 2.162 1.353-7.014-7.015 1.351 2.045 2.045c-1.287 1.904-2.045 4.191-2.045 6.663 0 6.627 5.385 12 12.025 12 3.204 0 6.107-1.259 8.264-3.297l-1.551-1.3z" fill="#000"/></svg></a></th></tr>'
                  var i = 0
                  for (; i < bminf.accounts.data.length; i++) {
                    if (bminf.accounts.data[i].name) {
                      todo = todo + "<tr>"

                      bminf.accounts.data[i].name =
                        "<img width='11' onclick='window.copytocb(`" +
                        bminf.accounts.data[i].id +
                        "`);' alt='" +
                        bminf.accounts.data[i].id +
                        "' src='" +
                        bminf.accounts.data[i].picture.data.url +
                        "'/>&nbsp;<b id='fbaccstatusbm" +
                        bminf.accounts.data[i].id +
                        "' onclick='window.shadowtext(`fbaccstatusbm" +
                        bminf.accounts.data[i].id +
                        "`);return true;'>" +
                        bminf.accounts.data[i].name +
                        "</b>"
                      if (bminf.accounts.data[i].verification_status) {
                        switch (bminf.accounts.data[i].verification_status) {
                          case "blue_verified":
                            bmvstatus =
                              '<span style="color: #7FB5DA;">' +
                              bminf.accounts.data[i].name +
                              "</span>"
                            break
                          default:
                            bmvstatus = "" + bminf.accounts.data[i].name
                            break
                        }
                      }

                      if (
                        bminf.accounts.data[i]
                          .has_transitioned_to_new_page_experience == true
                      ) {
                        bmvstatus +=
                          ' [<span style="color: #000;">新</span>]'
                      } else {
                        //bmvstatus+='[old]';
                      }
                      if (
                        pzrdlist.pzrdid.indexOf(bminf.accounts.data[i].id) != -1
                      ) {
                        //console.log('pzrd found');
                        bmvstatus +=
                          ' [<span style="color: green;">重新安装</span>]'
                      }

                      if (
                        pzrdlist.banid.indexOf(bminf.accounts.data[i].id) != -1
                      ) {
                        bmdisstatus =
                          '&#128308;<span style="color: red;">已禁用</span>'
                        bmdisstatus +=
                          '<button style="background:#384959;color:white;" id="FPAppeal' +
                          bminf.accounts.data[i].id +
                          '" onclick="window.appealfp(`' +
                          bminf.accounts.data[i].id +
                          '`); return false;">申诉</button>'
                      } else {
                        if (bminf.accounts.data[i].is_published == false) {
                          bmdisstatus =
                            '<a onclick="window.unhidefp(`' +
                            bminf.accounts.data[i].id +
                            '`);"><svg width="24" height="24" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m17.069 6.546 2.684-2.359c.143-.125.32-.187.497-.187.418 0 .75.34.75.75 0 .207-.086.414-.254.562l-16.5 14.501c-.142.126-.319.187-.496.187-.415 0-.75-.334-.75-.75 0-.207.086-.414.253-.562l2.438-2.143c-1.414-1.132-2.627-2.552-3.547-4.028-.096-.159-.144-.338-.144-.517s.049-.358.145-.517c2.111-3.39 5.775-6.483 9.853-6.483 1.815 0 3.536.593 5.071 1.546zm2.319 1.83c.966.943 1.803 2.014 2.474 3.117.092.156.138.332.138.507s-.046.351-.138.507c-2.068 3.403-5.721 6.493-9.864 6.493-1.297 0-2.553-.313-3.729-.849l1.247-1.096c.795.285 1.626.445 2.482.445 3.516 0 6.576-2.622 8.413-5.5-.595-.932-1.318-1.838-2.145-2.637zm-3.434 3.019c.03.197.046.399.046.605 0 2.208-1.792 4-4 4-.384 0-.756-.054-1.107-.156l1.58-1.389c.895-.171 1.621-.821 1.901-1.671zm-.058-3.818c-1.197-.67-2.512-1.077-3.898-1.077-3.465 0-6.533 2.632-8.404 5.5.853 1.308 1.955 2.567 3.231 3.549l1.728-1.519c-.351-.595-.553-1.289-.553-2.03 0-2.208 1.792-4 4-4 .925 0 1.777.315 2.455.843zm-2.6 2.285c-.378-.23-.822-.362-1.296-.362-1.38 0-2.5 1.12-2.5 2.5 0 .36.076.701.213 1.011z" fill="#000"/></svg></a>'
                        } else bmdisstatus = "&#128994;"
                        //bmdisstatus='<span style="color: green;" alt="alt">ACTIVE</span>';
                      }

                      if (bminf.accounts.data[i].fan_count > 100) {
                        bmlimstatus =
                          '<span style="color: green;">' +
                          bminf.accounts.data[i].fan_count +
                          "</span>"
                      } else {
                        bmlimstatus = "" + bminf.accounts.data[i].fan_count + ""
                      }

                      try {
                        if (bminf.accounts.data[i].roles.data.length > 0) {
                          fproles =
                            "" +
                            bminf.accounts.data[i].roles.data.length +
                            "<a onclick='window.showMorePopupFpRoles(`" +
                            bminf.accounts.data[i].id +
                            "`);'>" +
                            '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" width="12" height="12" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m22 5c0-.478-.379-1-1-1h-18c-.62 0-1 .519-1 1v14c0 .621.52 1 1 1h18c.478 0 1-.379 1-1zm-1.5 13.5h-17v-13h17zm-6.065-9.978-5.917 5.921v-1.243c0-.414-.336-.75-.75-.75-.415 0-.75.336-.75.75v3.05c0 .414.335.75.75.75h3.033c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-1.219l5.918-5.922v1.244c0 .414.336.75.75.75s.75-.336.75-.75c0-.715 0-2.335 0-3.05 0-.414-.336-.75-.75-.75-.715 0-2.318 0-3.033 0-.414 0-.75.336-.75.75s.336.75.75.75z" fill-rule="nonzero" fill="#000"/></svg></a>'
                        } else {
                          fproles = "n/a"
                        }
                      } catch (e) {
                        fproles = "n/a"
                      }
                      try {
                        if (bminf.accounts.data[i].ads_posts.data.length > 0) {
                          ///fpadscount='<span style="color: green;">'+bminf.accounts.data[i].ads_posts.data.length+'</span>'; 

                          fpadscount =
                            '<span style="color: green;">' +
                            bminf.accounts.data[i].ads_posts.data.length +
                            "</span>" +
                            "<a onclick='window.showMorePopupFpAds(`" +
                            bminf.accounts.data[i].id +
                            "`);'>" +
                            '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" width="12" height="12" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m22 5c0-.478-.379-1-1-1h-18c-.62 0-1 .519-1 1v14c0 .621.52 1 1 1h18c.478 0 1-.379 1-1zm-1.5 13.5h-17v-13h17zm-6.065-9.978-5.917 5.921v-1.243c0-.414-.336-.75-.75-.75-.415 0-.75.336-.75.75v3.05c0 .414.335.75.75.75h3.033c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-1.219l5.918-5.922v1.244c0 .414.336.75.75.75s.75-.336.75-.75c0-.715 0-2.335 0-3.05 0-.414-.336-.75-.75-.75-.715 0-2.318 0-3.033 0-.414 0-.75.336-.75.75s.336.75.75.75z" fill-rule="nonzero" fill="#000"/></svg></a>'
                        } else {
                          fpadscount =
                            "" +
                            bminf.accounts.data[i].ads_posts.data.length +
                            ""
                        }
                      } catch (e) {
                        /*console.log("FP 没有 ADS:(");*/ fpadscount = 0
                      }
                      todo =
                        todo +
                        ("<td><b>" +
                          bmvstatus +
                          "</b></td> <td><center><b>" +
                          bmdisstatus +
                          "</b></center> " +
                          "</td><td><center><b>" +
                          bmlimstatus +
                          "</b></center> " +
                          "</td><td><center><b>" +
                          fpadscount +
                          "</b></center> " +
                          "</td><td><b>" +
                          fproles +
                          "</b></td><td id='fpcomm_" +
                          bminf.accounts.data[i].id +
                          "'>-</td><td><b><a onclick='window.delfp(`" +
                          bminf.accounts.data[i].id +
                          '`);\'><svg width="14" height="14" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v19.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fill="#000"/></svg></a></b></td><td><b><a href=\'https://www.facebook.com/' +
                          bminf.accounts.data[i].id +
                          '\' target=\'_blank\'><svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" viewBox="0 0 24 24" clip-rule="evenodd"><path d="M14 4h-13v18h20v-11h1v12h-22v-20h14v1zm10 5h-1v-6.293l-11.646 11.647-.708-.708 11.647-11.646h-6.293v-1h8v8z" fill="#000"/></svg></a></b></td>')
                      todo = todo + "</tr>"
                    }
                  }
                  todo =
                    todo +
                    "<tr style='color:#000'><td></td><td></td><td></td><td></td><td></td><td id='fpcleanall'></td><td></td><td></td></tr>"
                  todo = todo + "</table>"
                } else {
                  //window.appendtab('没有 BM 帐户', "tab5"); 
                  todo = "没有可供显示的 FP 帐户:("
                }
              } catch (e) {
                console.log("没有可供显示的 FP 帐户:(")


              }

              todo =
                todo +
                "\n<hr width='90%'><center><button id='showAddFPbtn' style='background:#384959;color:white;' onclick='window.showAddFP(); return true;'>很棒的新 FP</button></center>"

              todo =
                todo +
                "<div id='tab4showadd'></div><center><div style='text-align: left;' id='tab4addfplog'></div></center>\n<hr width='90%'>"
              todo = todo + ""
              window.appendtab(todo, "tab4")
            }
          },
        )
      }

      window.checkBmFunc = function (tokn) {
        getbmid = document.getElementById("bmlookid").value
        bmurl =
          "https://graph.facebook.com/v19.0/" +
          getbmid +
          "?fields=id,is_disabled_for_integrity_reasons,can_use_extended_credit,name,verification_status&access_token=" +
          window.ftoken
        window.getJSON(bmurl, function (err, data) {
          if (err !== null) {
            alert("出现问题： " + err)
          } else {
            addrow = "<tr><td>" + getbmid + "</td><td>" + data.name + "</td>"
            if (data.is_disabled_for_integrity_reasons == true) {
              addrow =
                addrow + '<td><span style="color: red;">已禁用</span></td>'
            } else {
              addrow =
                addrow + '<td><span style="color: green;">活动</span></td>'
            }
            if (data.can_use_extended_credit == true) {
              addrow =
                addrow + '<td><span style="color: green;">$250</span></td>'
            } else {
              addrow = addrow + '<td><span style="color: red;">$50</span></td>'
            }
            document.getElementById("bmrestablediv").style.display = "block"
            var table = document.getElementById("bmrestableid")
            var row = table.insertRow(1)
            row.innerHTML = addrow
          }
        })

        //窗口。mainload(); 
      }
      ////////////////////////////indexedDB//////////////////////////////////
      window.pluginDb = {
        name: "fbaccplugDB",
        ver: 1,
        store: "config",
        keyPath: "id",
        initCfg: {
          id: "version",
          value: window.adsplugver,
        },
        dbIndex: [],
        con: false,
      }

      window.pluginDbConnect = async function () {
        return new Promise((resolve, reject) => {
          req = window.openRequest = indexedDB.open(pluginDb.name, pluginDb.ver)
          req.onsuccess = (res) => {
            pluginDb.con = res.target.result
            //console.log(`[connectDB] ${pluginDb.name}, task finished`);
            resolve()
          }
          req.onupgradeneeded = async (res) => {
            pluginDb.con = res.target.result
            await pluginDbInit()
            resolve()
          }
          req.onerror = (e) => {
            reject(e)
          }
        })
      }

      window.pluginDbInit = async function () {
        return new Promise((resolve, reject) => {
          if (pluginDb.con.objectStoreNames.contains(pluginDb.store)) {
            //console.log(`[createDB] ${pluginDb.name}, already initialized`);
            resolve(`[createDB] ${pluginDb.name}, already initialized`)
          }
          var objectStore = pluginDb.con.createObjectStore(pluginDb.store, {
            keyPath: pluginDb.keyPath,
          })
          objectStore.transaction.oncomplete = (e) => {
            trx = pluginDb.con
              .transaction(pluginDb.store, "readwrite")
              .objectStore(pluginDb.store)
            trx.put(pluginDb.initCfg)
            //console.log(`[createDB] ${pluginDb.name}, task finished`);
            resolve(`[createDB] ${pluginDb.name}, task finished`)
          }

          objectStore.transaction.onerror = (event) => {
            reject(`[createDB] ${pluginDb.name}, ${event.request.errorCode}`)
          }
        })
      }

      window.pluginDbgetKey = async function (key) {
        return new Promise((resolve, reject) => {
          var trx = pluginDb.con
            .transaction(pluginDb.store)
            .objectStore(pluginDb.store)
          trx = trx.get(key)
          trx.onsuccess = (r) => {
            if (r.target.result === undefined) {
              //console.log(`[readDB] ${pluginDb.store}, key: ${key} not found`);
              resolve(undefined)
            } else {
              //console.log(`[readDB] ${pluginDb.store}, key: ${key} value: ${r.target.result.value}`);
              resolve(r.target.result.value)
            }
          }

          trx.onerror = (e) => {
            reject(e)
          }
        })
      }

      window.pluginDbsetKey = async function (key, value) {
        return new Promise((resolve, reject) => {
          var trx = pluginDb.con
            .transaction(pluginDb.store, "readwrite")
            .objectStore(pluginDb.store)
          trx = trx.put({ id: key, value: value })
          trx.onsuccess = (r) => {
            //console.log(`[updateDB] ${pluginDb.store}, key: ${key} updated ${value}`);
            resolve(
              `[updateDB] ${pluginDb.store}, key: ${key} updated ${value}`,
            )
          }

          trx.onerror = (e) => {
            reject(e)
          }
        })
      }
      window.m_alert = function () {
        alert("添加微信：tuogegee")
      }
      ////////////////////////////indexedDB//////////////////////////////////
      ///head
      window.initAccstatusPlug = async function () {
        await window.pluginDbConnect()
        var overlay = document.createElement("div")
        overlay.id = "notif-overlay"
        overlay.innerHTML =
          "<div id='notif-overlay-databox' style='width:100%; height:100%; z-index:99998; background:#384959; opacity: 0.4; position: absolute; left:0; top: 0'></div>"
        overlay.setAttribute(
          "style",
          "width:100%; height:100%;  position: absolute; left:0; top:0;",
        )
        document.body.append(overlay)
        var sytime = new Date().toLocaleString()
        var div = document.createElement("div")
        div.id = "notif"
        div.setAttribute(
          "style",
          `background: linear-gradient(24deg,#3935AE 0%,#6971F9 100%); 
          background: -webkit-linear-gradient(24deg,#3935AE 0%,#6971F9 100%);
          background: -moz-linear-gradient(24deg,#3935AE 0%,#6971F9 100%);
          background: -o-linear-gradient(24deg,#3935AE 0%,#6971F9 100%);
          background: -ms-linear-gradient(24deg,#3935AE 0%,#6971F9 100%);
          ;box-shadow:0 1px 15px rgba(140,140,140);color:white;border-radius:5px;font-family:sans-serif;font-size:1.2em;position:absolute;top:3em;left:50%;overflow:auto;max-height:80%;min-width:40%;transform:translate(-50%,0);z-index:99999;`,
        )



        closetext =
          '<center id="notif-header">&nbsp;<a onclick="window.copytocb(`' +
          window.privateToken +
          '`);">' +
          `<svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path d="M18 6v-6h-18v18h6v6h18v-18h-6zm-12 10h-4v-14h14v4h-10v10zm16 6h-14v-14h14v14zm-3-8h-3v-3h-2v3h-3v2h3v3h2v-3h3v-2z"/></svg>` +
          '</b><style type="text/css">.blink_me{animation:blinker 1s linear infinite}.blink_me a:link{color:yellow;}@keyframes blinker{50%{opacity:0}}</style><b style="color:red" class="blink_me" id="plugupdate"></b></a><a href="https://baidu.com"><span id="userName" style="color:#fff">Facebook广告插件</span></a>&nbsp;&nbsp;&nbsp;  </center>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' +
          '<a onclick="window.m_alert()" style="position: absolute;top: 10px;right: 80px;transition: all 200ms;font-size: 20px;font-weight: bold;text-decoration: none;color: #fff;"><svg t="1727317808793" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4804" data-spm-anchor-id="a313x.search_index.0.i9.4bca3a81ZIjaeb" width="16" height="16"><path d="M511.51393 63.894216c-114.5315 0-229.061976 43.508933-316.720432 131.167389-174.676321 174.676321-174.676321 458.764542 0 633.440863 87.658456 87.658456 202.188932 131.167389 316.720432 131.167389s229.062999-43.508933 316.720432-131.167389c174.676321-174.676321 174.676321-458.764542 0-633.440863C740.576929 107.403149 626.045429 63.894216 511.51393 63.894216zM511.51393 108.683305c52.466955 0 103.653755 10.237155 151.641699 29.432333 49.907667 20.475334 94.695732 49.907667 133.086088 88.937588 39.029922 38.390355 68.463278 83.179444 88.937588 133.086088 19.195178 47.987944 29.432333 99.174744 29.432333 151.641699s-10.237155 103.653755-29.432333 151.641699c-20.47431 49.907667-49.907667 94.695732-88.937588 133.086088-38.390355 39.029922-83.179444 68.463278-133.086088 88.937588-47.987944 19.195178-99.174744 29.432333-151.641699 29.432333-52.466955 0-103.653755-10.237155-151.641699-29.432333-49.907667-20.475334-94.695732-49.907667-133.086088-88.937588-39.029922-38.390355-68.463278-83.179444-88.937588-133.086088-19.195178-47.987944-29.432333-99.174744-29.432333-151.641699s10.237155-103.653755 29.432333-151.641699c20.475334-49.907667 49.907667-94.695732 88.937588-133.086088 38.390355-39.029922 83.179444-68.463278 133.086088-88.937588C407.860175 118.92046 459.046974 108.683305 511.51393 108.683305z" fill="#ffffff" p-id="4805" data-spm-anchor-id="a313x.search_index.0.i5.4bca3a81ZIjaeb" class=""></path><path d="M511.51393 674.300456c-18.555611 0-34.55091 15.355733-34.55091 34.55091 0 18.555611 15.996322 33.911344 34.55091 33.911344 19.195178 0 34.55091-15.355733 34.55091-33.911344C546.065863 689.657212 530.709107 674.300456 511.51393 674.300456zM512.154519 280.799314c-42.2298 0-76.141144 10.877745-101.734032 33.911344-25.593911 22.394033-41.589211 55.026244-46.707788 97.895611l58.225099 7.0383c4.479011-31.991622 15.355733-55.665811 31.352055-70.381977 15.996322-15.355733 35.831067-22.394033 59.505255-22.394033 24.953322 0 46.068222 8.317433 63.343677 24.953322 16.635889 15.996322 24.953322 35.1915 24.953322 57.585533 0 11.517311-2.559289 23.034623-8.317433 33.271778-5.758144 10.237155-18.555611 23.674189-37.750789 40.949644-19.834744 17.275455-33.271778 30.072923-40.949644 39.029922-9.597589 12.156878-17.275455 24.313755-21.754466 36.470633-6.398734 15.996322-9.597589 35.1915-9.597589 56.945967l0.639566 17.275455 53.746088 0c0.639566-22.394033 1.919722-39.029922 4.479011-48.627511 3.198855-10.237155 7.0383-19.195178 12.796444-26.873044 5.758144-7.677866 17.275455-19.834744 35.831067-35.831067 26.873044-24.313755 45.428655-44.789089 55.026244-61.424978 8.958022-16.635889 14.0766-35.1915 14.0766-55.026244 0-34.55091-13.437034-63.984267-40.310078-88.298022C592.773651 292.956192 556.942585 280.799314 512.154519 280.799314z" fill="#ffffff" p-id="4806" data-spm-anchor-id="a313x.search_index.0.i8.4bca3a81ZIjaeb" class=""></path></svg></a>' +
          '<a class="close" style="position: absolute;top: 10px;right: 60px;transition: all 200ms;font-size: 20px;font-weight: bold;text-decoration: none;color: #fff;" onclick="window.mainconfig();" href="#">&#x2699;</a>' +
          '<a class="close" style="position: absolute;top: 10px;right: 40px;transition: all 200ms;font-size: 20px;font-weight: bold;text-decoration: none;color: #fff;" onclick="window.mainreload();" href="#">&#x21BB;</a>' +
          '&nbsp;<a class="close" style="position: absolute;top: 10px;right: 20px;transition: all 200ms;font-size: 20px;font-weight: bold;text-decoration: none;color: #fff;" onclick="window.mainclose();" href="#">&#xd7;</a><br><div id="fbaccmainblock"><div id="fbaccmainsubblock"><div id="dblock1" style="padding:11px 11px 0"></div><div id="dblock1ccform" style="display: none;"><form><div class="form-row"><div class="col-4"><input type="text" id="ccNumber" placeholder="1234567812341234" style="background: #384959;color:white;" maxlength="16" size="16"><select style="background: #384959;color:white;border:none;" id="ccMonth"><option value="01">01</option><option value="02">02</option><option value="03">03</option><option value="04">04</option><option value="05">05</option><option value="06">06</option><option value="07">07</option><option value="08">08</option><option value="09">09</option><option value="10">10</option><option value="11">11</option><option value="12">12</option></select><select style="background: #384959;color:white;border:none;" id="ccYear"><option value="2022">2022</option><option value="2023">2023</option><option value="2024">2024</option><option value="2025">2025</option><option value="2026">2026</option><option value="2027">2027</option><option value="2028">2028</option><option value="2029">2029</option><option value="2030">2030</option><option value="2031">2031</option><option value="2032">2032</option><option value="2033">2033</option><option value="2034">2034</option><option value="2035">2035</option></select><input type="text" id="ccCVC" placeholder="123" style="background: #384959;color:white;" maxlength="3" size="3"><input type="text" id="ccIso" placeholder="UA" style="background: #384959;color:white;" maxlength="2" size="2"></div></div><center><button style="background:#384959;color:white;" id="addCCtoadAccProcessForm" onclick="window.addCCtoadAccProcessForm(); return false;">添加付款方式</button></center></form></div></div><div id="dblock2" style="background-color:#fff"></div><style type="text/css">.tabs{width:100%;display:inline-block;}.tab-links:after{display:block;clear:both;content:""}.tab-links li{margin:0px 1px;float:left;list-style:none;}.tab-links a{padding:9px 15px;display:inline-block;border-radius:3px 3px 0px 0px;background:#7FB5DA;font-size:12px;font-weight:600;color:#4c4c4c;transition:all linear 0.15s}.tab-links a:hover{background:#a7cce5;text-decoration:none}li.active a,li.active a:hover{background:#000;color:#fff}.tab-content{color:#000;font-size:1.2em;padding:0 15px;border-radius:3px;box-shadow:-1px 1px 1px rgba(0,0,0,0.15);}.tab-content a{color:#7FB5DA;cursor:help}.tab-content b{font-size:1.2em;}.tab{display:none}.tab.active{display:block}.prep{font-size: .7rem;margin: 0;white-space: pre-wrap;}</style><div id="dblock3" style="background-color:#fff;"><div class="tabs"><ul class="tab-links"><li class="active tabli" id="tabli1"><a href="#tab1" onclick="window.adstabselect(1);return true;" id="tabhead1">广告</a></li><!--<li id="tabli2" class="tabli"><a href="#tab2" onclick="window.adstabselect(2);return true;" id="tabhead2">AdCreo</a></li>--><li id="tabli3" class="tabli"><a href="#tab3" onclick="window.adstabselect(3);return true;" id="tabhead3">广告户</a></li><li id="tabli4" class="tabli"><a href="#tab4" onclick="window.adstabselect(4);return true;" id="tabhead4">公共主页</a></li><li id="tabli5" class="tabli"><a href="#tab5" onclick="window.adstabselect(5);return true;" id="tabhead5">BM业务经理</a></li><!--<li id="tabli6" class="tabli"><a href="#tab6" onclick="window.adstabselect(6);return true;" id="tabhead6">X</a></li>--></ul><div class="tab-content"><div id="tab1"class="tab active"></div><div id="tab2"class="tab"></div><div id="tab3"class="tab"></div><div id="tab4"class="tab"></div><div id="tab5"class="tab"></div><div id="tab6"class="tab"></div></div></div>' +

          '<style type="text/css">@-webkit-keyframes scroll{0%{-webkit-transform:translate(0,0);transform:translate(0,0)}100%{-webkit-transform:translate(-100%,0);transform:translate(-100%,0)}}@-moz-keyframes scroll{0%{-moz-transform:translate(0,0);transform:translate(0,0)}100%{-moz-transform:translate(-100%,0);transform:translate(-100%,0)}}@keyframes scroll{0%{transform:translate(0,0)}100%{transform:translate(-100%,0)}}.marquee{display:block;width:100%;white-space:nowrap;overflow:hidden}.marquee span{display:inline-block;padding-left:100%;-webkit-animation:5s linear infinite scroll;-moz-animation:5s linear infinite scroll;animation:5s linear infinite scroll}</style><div id="fbplugads" class="marquee"><span></span></div></div>'
        div.innerHTML = closetext

        // `<span id="userName" style="color:#fff">Facebook广告插件</span>` + 
        // div.innerHTML = "<div></div>"
        overlay.append(div)
        dragElement(div)
        window.getPopupCoords(false)
      }

      window.adstabselect = async function (tab) {
        window.getAccessTokenFunc()
        window.checkauth()
        var tabelements = document.getElementsByClassName("tab")
        for (var i = 0; i < tabelements.length; i++) {
          tabelements[i].className = "tab"
        }
        var tablielements = document.getElementsByClassName("tabli")
        for (var i = 0; i < tablielements.length; i++) {
          tablielements[i].className = ""
        }
        document.getElementById("tab" + tab).className = "tab active"
        document.getElementById("tabli" + tab).className = "tabli active"

        let hidemain = await pluginDbgetKey("hidemainontab")
        // console.log("Hide="+hidemain); 
        // console.log("Tab="+tab); 
        if (hidemain == 1 && tab > 1) window.mainhide()

        if (tab == 1) {
          /*ACC tab*/
          //window.showaccstatus(); 
          console.log("Tab1 def active")
          window.mainunhide()
        }
        if (tab == 3) {
          /*ACC tab*/
          window.showaccstatus()
          console.log("Tab3 Accs active")
        }
        if (tab == 4) {
          /*FP tab*/
          window.showfpstatus()
          console.log("Tab4 FP active")
        }
        if (tab == 5) {
          /*BM tab*/
          await window.showbmstatus()
          console.log("Tab5 BM active")
        }
        if (tab == 6) {
          /*私人标签*/
          window.showprivate()
          console.log("Tab6 Private active")
        }

        var sytime = new Date().toLocaleString()
        document.getElementById("sytime").innerHTML = "&#x21BB; " + sytime
      }

      window.appendtab = function (content, dblock) {
        div = document.getElementById(dblock)
        div.innerHTML = content
      }
      window.appendtabplus = function (content, dblock) {
        div = document.getElementById(dblock)
        div.innerHTML += content
      }

      var appendadd = function (name, dblock) {
        div = document.getElementById(dblock)
        div.innerHTML = name
      }

      window.getURLParameter = function (name) {
        return decodeURI(
          (RegExp(name + "=" + "(.+?)(&|$)").exec(location.search) || [
            ,
            null,
          ])[1] || "",
        )
      }

      window.mainclosead = function () {
        //document.getElementById("notif").remove();
        document.getElementById("fbplugads")?.remove()
      }
      window.mainclose = function () {
        //document.getElementById("notif").remove();
        document.getElementById("notif-overlay")?.remove()
        window.destroyPluginPopup()
      }
      window.mainhide = function () {
        document.getElementById("fbaccmainsubblock").style.display = "none"
      }
      window.mainunhide = function () {
        document.getElementById("fbaccmainsubblock").style.display = "block"
      }

      window.mainreload = function () {
        //document.getElementById("notif")?.remove();
        document.getElementById("notif-overlay")?.remove()
        window.destroyPluginPopup()
        window.mainload()
      }

      window.mainconfig = function () {
        //	 document.getElementById("notif").remove();
        document.getElementById("fbaccmainblock").innerHTML = ""
        var congigblock = ""
        configblock = `<center><h1>插件设置</h1><hr/></center> 
   <div id="fbaccsetconfig">
   Main tab: <select style='background: #384959;color:white;' id='fbaccsetconfigtabselect'>
   <option value='1'>默认（帐户广告）</option> 
   <option value='3'>AdsAccs</option> 
   <option value='4'>页面</option> 
   <option value='5'>BM</option> 
   </select><br/>


   在标签上隐藏主帐户：<select style='background: #384959;color:white;' id='fbaccsetconfighidemainontabselect'><option value='0'>否</option><option value='1'>是</option></select><br/>
   将货币转换为美元：<select style='background: #384959;color:white;' id='fbaccsetconfigconvertselect'><option value='0'>否</option><option value='1'>是</option></select><br/> 
   PZRD 页面状态：<select style='background: #384959;color:white;' id='fbaccsetconfigpzrdfpselect'><option value='1'>是</option><option value='0'>否</option></select><br/> 
   <!--PZRD BM 状态：<select style='background: #384959;color:white;' id='fbaccsetconfigpzrdbmselect'><option value='1'>是</option><option value='0'>否</option></select><br/> 
   PZRD Acc 状态：<select style='background: #384959;color:white;' id='fbaccsetconfigpzrdaccselect'><option value='0'>否</option><option value='1'>是</option></select><br/> 
   </div>--> 
   <br/> 
   <center><button style='background:#384959;color:white;' id='fbaccsetconfigsave' onclick='window.mainconfigsave(); return false;'>保存设置</button></center> 
   `

        document.getElementById("fbaccmainblock").innerHTML = configblock

        let cfgValues = ["tab", "convert", "pzrdfp", "pzrdbm", "pzrdacc"]
        cfgValues.forEach(async (element) => {
          let domId = `fbaccsetconfig${element}select`
          //console.log(domId); 
          let v = await pluginDbgetKey(element)
          if (v != undefined) document.getElementById(domId).value = v
        })

        // window.mainload(); 
      }
      window.mainconfigsave = async function () {
        await pluginDbsetKey(
          "tab",
          document.getElementById("fbaccsetconfigtabselect").value,
        )
        await pluginDbsetKey(
          "convert",
          document.getElementById("fbaccsetconfigconvertselect").value,
        )
        await pluginDbsetKey(
          "pzrdfp",
          document.getElementById("fbaccsetconfigpzrdfpselect").value,
        )
        // await pluginDbsetKey('pzrdbm', document.getElementById("fbaccsetconfigpzrdbmselect").value); 
        //等待pluginDbsetKey('pzrdacc'， document.getElementById("fbaccsetconfigpzrdaccselect").value);
        await pluginDbsetKey(
          "hidemainontab",
          document.getElementById("fbaccsetconfighidemainontabselect").value,
        )
        window.mainreload()

        /*var getcConfigTabval = document.getElementById("fbaccsetconfigtabselect").value;
     var getcConfigConvertval = document.getElementById("fbaccsetconfigconvertselect 
     ").value; var 
     getcConfigPzrdfpval = document.getElementById("fbaccsetconfigpzrdfpselect").value; var getcConfigPzrdbmval = document.getElementById("fbaccsetconfigpzrdbmselect").value; 
     var getcConfigPzrdaccval = document.getElementById("fbaccsetconfigpzrdaccselect").value;*/
      }
      window.getCookie = function (name) {
        let matches = document.cookie.match(
          new RegExp(
            "(?:^|; )" +
            name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
            "=([^;]*)",
          ),
        )
        return matches ? decodeURIComponent(matches[1]) : undefined
      }
      window.copytocb = function (copytext) {
        navigator.clipboard
          .writeText(copytext)
          .then(() => {
            alert(copytext + " - 成功复制到剪贴板")
          })
          .catch(() => {
            alert("错误复制到剪贴板")
          })
      }
      window.shadowtext = function (divid) {
        // div = document.getElementById(divid)
        // document.getElementById(divid).style.cssText +=
        //   "text-shadow: 0 0 32px white;color: transparent;"
      }
      /* ################## 主代码 #################*/
      window.mainload = async function () {
        window.getAccessTokenFunc()
        window.checkVerFunc()
        await initAccstatusPlug()
        let tab = await pluginDbgetKey("tab")
        if (tab != undefined) window.adstabselect(tab)
        var ApiUrlMainInfo =
          "https://graph.facebook.com/v19.0/act_" +
          window.selectedacc +
          "/ads/?fields=name,status,timezone_name,timezone_id,ad_review_feedback,adcreatives{image_url},delivery_status&limit=100&access_token=" +
          window.privateToken +
          "&locale=en_US"
        var ApiUrlFullInfo =
          "https://graph.facebook.com/v19.0/act_" +
          window.selectedacc +
          "?fields=name,id,adtrust_dsl,account_status,disable_reason,balance,amount_spent,business_restriction_reason,average_daily_campaign_budget,is_new_advertiser,timezone_name,timezone_id,currency,self_resolve_uri,age,max_billing_threshold,current_unbilled_spend,adspaymentcycle&access_token=" +
          window.privateToken +
          "&locale=en_US"
        var ApiUrlFinInfo =




          "https://graph.facebook.com/v19.0/act_" +
          window.selectedacc +
          "?fields=funding_source_details&access_token=" +
          window.privateToken +
          "&locale=en_US"
        var todo = ""
        let todo_row = ""
        window.getJSON(ApiUrlFullInfo, function (theLibrary, options) {
          todo = ``
          // console.log("账户信息：", options);
          window.options = options

          var addtodo = `<div class="user" style="display:flex;align-items:center;gap:20px;padding-bottom:20px">
          <div class="img_box">
            <img style="width:50px;height:50px;" src="data:image/jpeg;base64,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">
          </div>
          `

          todo += addtodo

          // if (options.is_new_advertiser) {
          //   addtodo = "[新]"
          // } else addtodo = "[非新]"
          addtodo = "[当前广告户]"

          // appendadd(options.name + addtodo, "userName")

          todo +=
            "<center><b id='fbaccstatusaccname' onclick='window.shadowtext(`fbaccstatusaccname`);return true;'>" +
            options.name +
            addtodo +
            "</b> " +
            "</center></div>"

          todo += `
          <div style="padding-bottom:20px;display:flex;gap:10px">
            <span style="line-height:1.3">免费使用</span>
          </div>
          `

          todo += `
            <div style="padding-bottom:20px">
              <span style="color:#9092f1">#广告户</span>
              <span style="color:#9092f1">#公共主页</span>
              <span style="color:#9092f1">#BM业务经理</span>
              <span style="color:#9092f1">#绑卡</span>
              <span style="color:#9092f1">#查询</span>
            </div>
          `
          if (theLibrary !== null) {
            alert("出现错误： " + theLibrary)
          } else {
            if (options.self_resolve_uri) {
              todo =
                todo +

                ('<span style="color: red;">1$ Payment check : <a href="https://facebook.com/' +
                  options.self_resolve_uri +
                  '">打开</a></span>\n<br>')
            }
            if (options.account_status) {
              switch (options.account_status) {
                case 1:
                  astatus = '<span style="color:#71ed71">正常</span>'
                  break
                case 2:
                  astatus =
                    '<span style="color: red;">异常</span> [<a href="https://www.facebook.com/help/contact/2026068680760273" target="_blank">Appeal</a>]'
                  break
                case 3:
                  astatus = "未知"
                  break
                case 7:
                  astatus = "PENDING_RISK_REVIEW"
                  break
                case 8:
                  astatus = "PENDING_SETTLEMENT"
                  break
                case 9:
                  astatus = "IN_GRACE_PERIOD"
                  break
                case 100:
                  astatus = "PENDING_CLOSURE"
                  break
                case 101:
                  astatus = "CLOSED"
                  break
                case 201:
                  astatus = "ANY_ACTIVE"
                  break
                case 202:
                  astatus = "ANY_CLOSED"
                  break
                default:
                  astatus = "UNKNOWN " + options.account_status
                  break
              }
              // todo = todo + ("帐户状态: " + astatus + "\n<br>")
              todo_row = `<div class="row_list" style="display:flex;border-top:1px solid #fff">
              <div class="row_item" 
              style="border-right:1px solid #fff;padding:10px 10px 0;box-sizing:border-box;flex:1">
              帐户状态<br/> ${astatus}
              </div>`
              todo += todo_row
            }

            var tzoneDict = {
              "Asia/Shanghai": "亚洲/上海",
              "Ho_Chi_Minh": "胡志明市",
              "Los_Angeles": "洛杉矶"
            }



            if (options.timezone_name) {
              let zname = tzoneDict[options.timezone_name] || options.timezone_name
              todo_row = `<div class="row_item" style="border-right:1px solid #fff;padding:10px 10px 0;box-sizing:border-box;flex:1">`
              todo_row +=
                ("<div id='fbaccstatusacctzoneformdiv' style='display:none;'>Account TZ:<select style='background: #384959;color:white;' id='fbaccstatusacctzoneselect'><option value='0'>TZ_UNKNOWN[0]</option><option value='1'>TZ_AMERICA_LOS_ANGELES[1]</option><option value='7'>TZ_AMERICA_NEW_YORK[7]</option><option value='8'>TZ_ASIA_DUBAI[8]</option><option value='476'>TZ_ASIA_CALCUTTA[476]</option><option value='12'>TZ_EUROPE_VIENNA[12]</option><option value='47'>TZ_EUROPE_BERLIN[47]</option><option value='137'>TZ_EUROPE_KIEV[137]</option><option value='53'>TZ_AFRICA_CAIRO[53]</option><option value='348'>TZ_ATLANTIC_BERMUDA[348]</option><option value='447'>TZ_PACIFIC_FIJI[447]</option></select><button style='background:#384959;color:white;' id='fbaccstatusacctzoneformdivgo' onclick='window.ProcessEdittzone(); return false;'>Go</button></div><div id='fbaccstatusacctzonediv'>账户时区 <span id='fbaccstatusacctzone' onclick='window.shadowtext(`fbaccstatusacctzone`);return true;'><br/>" +
                  zname +
                  "</span><a onclick='window.ShowEdittzone();return true;'>^</a></div>")
            }
            if (options.business_restriction_reason != "none") {
              todo_row +=
                ("BM ban reason: <span style='color: red;'>" +
                  options.business_restriction_reason +
                  "</span>\n<br>")
            }

            todo_row += "</div>"

            todo += todo_row

            try {
              if (options.current_unbilled_spend.amount) {
                try {
                  if (options.adspaymentcycle.data[0].threshold_amount > 0) {
                    /* billlim=options.adspaymentcycle.data[0].threshold_amount/100+".00";*/
                    billlim =
                      options.adspaymentcycle.data[0].threshold_amount / 100
                  }
                } catch (e) {
                  console.log("threshold_amount error")
                  billlim = "na"
                }
                if (window.currency_symbols[options.currency] !== undefined) {
                  currency_symbol = window.currency_symbols[options.currency]
                } else {
                  currency_symbol = options.currency
                }

                if (options.amount_spent > 0) {
                  allspent = options.amount_spent / 100
                } else {
                  allspent = 0
                }
                /*todo = todo + ("Balance: <b>" + options.current_unbilled_spend.amount + "</b>&nbsp;/&nbsp;<b>" + billlim + "</b>&nbsp;/&nbsp; <b>" + allspent + "</b> " + options.currency + ' <br>');*/
                let optcurredit =
                  `<span id='fbaccstatusacccurrformdiv' style='display:none;'><select style='background: #384959;color:white;' id='fbaccstatusacccurrselect'><option value="USD">美元</option><option value="EUR">欧元</option><option value="GBP">英镑</option><option value="PLN">波兰兹罗提</option><option value="UAH">乌克兰格里夫纳</option><option value="DZD">德国杜鲁门教士</option><option value="ARS">阿根廷比索</option><option value="AUD">澳元</option><option value="BDT">孟加拉塔卡马提亚</option><option value="BOB">巴西里拉</option><option value="BRL">巴西里拉</option><option value="CAD">加元</option><option value="CLP">智利比索</option><option value="CNY">人民币</option><option value="CZK">捷克克朗</option><option value="EGP">埃及镑</option><option value="HUF">匈牙利福林</option><option value="INR">印度卢比</option><option值="IDR">IDR</option><option 值="MYR">MYR</option><option 值="PKR">PKR</option><option 值="RUB">RUB</option><option 值="THB">THB</option><option 值="TRY">TRY</option><option 值="VND">VND</option><option 值="LKR">LKR</option></select><button style='background:#384959;color:white;' id='fbaccstatusacccurrformdivgo' onclick='window.ProcessEditcurr(); return false;'>开始</button></span><span id='fbaccstatusacccurrdiv'>` +
                  options.currency +
                  '<a onclick="window.ShowEditcurr();return true;">^</a></span>'
                options.currency
                todo_row = `<div class="row_item" style="border-right:1px solid #fff;padding:10px 10px 0;box-sizing:border-box;flex:1">`
                todo_row +=
                  ("花费-门槛<br/><b>" +
                    currency_symbol +
                    options.current_unbilled_spend.amount +
                    "</b>&nbsp;&nbsp;<b><br/>" +
                    billlim +
                    "</b>&nbsp;" +
                    optcurredit +
                    `</div><div class="row_item" style="border-right:1px solid #fff;padding:10px 10px 0;box-sizing:border-box;flex:1">` +
                    "账户的限额花费<br/><b>" +
                    currency_symbol +
                    allspent +
                    "</b><br>")
                todo_row += "</div>"
                todo += todo_row
              }
            } catch (e) {
              console.log("unbilled_spend error")
            }
            if (options.disable_reason) {
              switch (options.disable_reason) {
                case 0:
                  astatus = "NONE"
                  break
                case 1:
                  astatus = "ADS_INTEGRITY_POLICY"
                  break
                case 2:
                  astatus = "ADS_IP_REVIEW"
                  break
                case 3:
                  astatus =
                    'RISK_PAYMENT [<a href="https://www.facebook.com/help/contact/531795380173090" target="_blank">Appeal</a>]'
                  break
                case 4:
                  astatus = "GRAY_ACCOUNT_SHUT_DOWN"
                  break
                case 5:
                  astatus = "ADS_AFC_REVIEW"
                  break
                case 6:
                  astatus = "BUSINESS_INTEGRITY_RAR"
                  break
                case 7:
                  astatus = "PERMANENT_CLOSE"
                  break
                case 8:
                  astatus = "UNUSED_RESELLER_ACCOUNT"
                  break
                case 9:
                  astatus = "UNUSED_ACCOUNT"
                  break
                default:
                  astatus = "UNKNOWN " + options.disable_reason
                  break
              }
              todo_row = `<div class="row_item" style="border-right:1px solid #fff;padding:10px 10px 0;box-sizing:border-box;flex:1">`
              todo_row +=
                ('禁用原因：<span style="color: red;">' +
                  astatus +
                  "</span></div>")
              todo += todo_row
            }
            if (options.adtrust_dsl) {
              if (options.adtrust_dsl == -1) {
                slimit = "不限额"
              } else {
                slimit = currency_symbol + options.adtrust_dsl
              }
              todo_row = `<div class="row_item" style="border-right:1px solid #fff;padding:10px 10px 0;box-sizing:border-box;flex:1">`
              todo_row += ("消费限额<br/><b>" + slimit + "</b></div>")
              todo += todo_row
            }

            todo_row = `<div id="card" class="row_item" style="padding:10px 10px 0;box-sizing:border-box;flex:1">信用卡<br/> n/a <br/>[<button style="color:red" onclick="window.addCCtoadAccForm();return true;">添加</button>]</div>`
            todo += todo_row
            todo_row += "</div>"
            appendadd(todo, "dblock1")

            todo = `
            <div style="padding:10px 15px;box-sizing:border-box;background-color:#fff">
            <select onChange="window.open(this.value)" style="width: 100%;background: #fff;border:4px solid #ccd0d5"> 
           <option value="">快速链接</option> 
           <option value="https://www.facebook.com/accountquality">帐户质量</option> 
           <option value="https://business.facebook.com/help/contact/649167531904667">手动付款</option> 
           <option value="https://business.facebook.com/overview">BM 创建</option> 
           <option value="https://developers.facebook.com/tools/debug/">FB 调试器</option> 
           <option value="https://www.facebook.com/help/contact/305334410308861">广告诉求</option> 
           <option value="https://mbasic.facebook.com/support/forms/flow_view?id=2166173276743732">BM 诉求</option> 
           <option value="https://mbasic.facebook.com/support/forms/flow_view?id=273898596750902">社交账户诉求</option> 
           <option value="https://mbasic.facebook.com/support/forms/flow_view?id=2158932601016581">页面诉求</option> 
           <option value="https://mbasic.facebook.com/support/forms/flow_view?id=2026068680760273">广告 ACC 申诉</option> 
           <option value="https://facebook.com/help/contact/391647094929792">信用卡申诉</option> 
           <option value="https://business.facebook.com/certification/nondiscrimination/">非歧视</option> 
           <option value="https://business.facebook.com/help/contact/856051674863409">重新启用已禁用的广告帐户</option> 
           <option value="https://www.facebook.com/payments/risk/preauth/?ad_account_id=${window.selectedacc}&entrypoint=AYMTAdAccountUnrestrictLinkGenerator">批准暂时保留</option> 
           <option value="https://www.facebook.com/diagnostics">iP 信息</option> 
           <option value="https://www.facebook.com/primary_location/info">主要位置</option></select>
           </div>
            `

            appendadd(todo, "dblock2")
          }
        })
        window.checkauth()
        try {
          todo = await window.getAccAds(window.selectedacc)
          console.log("插入内容：", todo);

        } catch (e) {
          console.log("主广告错误")
          todo = ""
        }
        await window.appendtab(todo, "tab1")


        window.getJSON(ApiUrlFinInfo, function (theLibrary, options) {
          if (theLibrary !== null) {
            console.log("卡请求错误")
          } else {
            try {
              if (options.funding_source_details.display_string) {
                console.log("卡数据：", options.funding_source_details.display_string)
                window.appendtab(
                  "信用卡<br/> <b>" +
                  options.funding_source_details.display_string +
                  '</b>&nbsp;<br/>[<button onclick="window.addCCtoadAccForm();return true;" style="color:red">添加</button>]<br>',
                  "card",
                )
              }
            } catch (e) {
              console.log("卡信息写入错误")
            }
          }
        })
      }
      window.mainload()
    }
  } else {
    if (location.host.indexOf("facebook.com") > -1) {
      location.href = "/adsmanager/manage/campaigns"
    } else {
      if (confirm("您确定要打开 Facebook 广告管理器吗？")) {
        location.href = "https://www.facebook.com/adsmanager/manage/campaigns"
      }
    }
  }
})();
