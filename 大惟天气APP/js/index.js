
$(function(){
    function nowday(city){
         //获取天气数据
         data={
            appid:'12627738',
            appsecret:'Tf6yoxfB',
            version:'v6'
         }
         if(city!==undefined){
             data.city=city
         }
    $.ajax({
        //请求类型
        type: 'GET',
        //请求地址
        url: 'https://www.tianqiapi.com/api',
        //请求参数
        data: data,
        dataType:'jsonp',
        //请求成功后执行的回调函数
        success:function (data) {
          console.log('data ==> ', data);
          //绑定位置
          $('.top-title').text(data.city)
          //绑定当天天气
          $('.wind').text(data.win)
          $('.number').text(data.tem)
          $('.wenzi').text(data.wea)
          $('.weak1').text(data.week)
          $('.weak2').text(data.date)
          $('.now-weather-icon').css({
              backgroundImage :'url(./img/' +data.wea_img +'.png)'
          })
        },
      })
    }
   function tf(city){
         //获取24小时天气数据
         var data={
            appid:'12627738',
            appsecret:'Tf6yoxfB',
            version:'v9'
         }
         if(city!==undefined){
             data.city=city
         }
    $.ajax({
        type:'GET',
        url: 'https://www.tianqiapi.com/api',
        data:data,
        dataType:'jsonp',
        success:function(data){
            console.log('24data',data)
            var tfhoursData=data.data[0].hours;
            /* console.log(tfhoursData); */
            //24小时天气
            for(i=0;i<tfhoursData.length;i++){
                var li= $(` <li>
                <div>${parseFloat(tfhoursData[i].hours)}:00</div>
                <i class="weather-icon " style="background-image:url('./img/${tfhoursData[i].wea_img}.png')"></i>
                <div>${tfhoursData[i].tem}℃</div>
            </li>`)
            $('#tf-weather').append(li)
            }
            //未来6天天气
            var sixDate=data.data.slice(1);
            /* console.log("sixDate",sixDate) */
            $.each(sixDate , function (i,v){
                var li=$(` <li class="clearfix">
                <span>${v.date.slice(5)}</span>
                <span>
                    <i class="weather-icon" style="background-image:url('./img/${v.wea_day_img}.png')"></i>
                </span>
                <span>${v.tem2}℃~${v.tem1}℃</span>
                <span>${v.win[0]}</span>
            </li>`)
            $('#sixDate').append(li)
            })
        }
    })
   }

   nowday();
   tf();
   //城市搜索
   $('.search-icon').on('click',function(){
        var city=$('#search-city').val()

        if( city==undefined||city.trim()==""){
            return
        }
        console.log(city)
        $('#tf-weather,#sixDate').empty()
        nowday(city);
        tf(city);
   })
})