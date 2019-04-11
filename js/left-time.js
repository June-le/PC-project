/**
 * 倒计时 Create By TuJia @2017.05.10
 * 使用方法：
 * .container 中放入现在的时间到结束的时间的秒数
 * 运行 leftTimer.run($('.countdown')); 即可
 *
 * leftTimer.run(container[,theme]);
 * 示例：
 * leftTimer.run($('.countdown'));
 * leftTimer.run($('.countdown'), 'H时M分S秒');
 * leftTimer.run($('.countdown'), 'H时M分S秒', function(){
 *   // do some things
 * });
 */


/**
 * add by lty 20180102
 * 位数不足十补零
 */
function fillZeroPrefix(num) {
  return num < 10 ? "0" + num : num
}

var leftTimer = {
  startTime:0,
  count:0,
  interval:1000,
  oneday:3600 * 24,
  str:'',
  day:0,
  hour:0,
  minute:0,
  second:0,
  showDay:false,
  showHour:false,
  showMinute:false,
  showSecond:false,
  offset:0,
  nextTime:0,
  run:function(container, theme, cb){
    var scope     = this;
    
    scope.startTime = new Date().getTime();
    scope.nextTime  = scope.interval;
    
    theme       = theme || "D天H时M分S秒";
    cb        = cb || function(){};

    container.each(function(){
      var _this = $(this);
      var lefttime = parseInt(_this.html());
      _this.html('启动中...');
      scope.countdown(lefttime, _this, theme, cb);
    });
  },
  countdown:function(lefttime, obj, theme, cb){
    var scope = this;

    scope.offset    = new Date().getTime() - (scope.startTime + scope.count * scope.interval);
    scope.nextTime  = scope.interval - scope.offset;
    
    scope.showDay  = theme.indexOf('D')!=-1;
    scope.showHour   = theme.indexOf('H')!=-1;
    scope.showMinute = theme.indexOf('M')!=-1;
    scope.showSecond = theme.indexOf('S')!=-1;

    window.setTimeout(function(){
      lefttime--;
      if(lefttime<0){
        // 回调
        cb(obj);
        return false;
      }

      scope.day  = Math.floor(lefttime / scope.oneday);//还有几天
      scope.hour   = Math.floor((lefttime - scope.day * scope.oneday) / 3600);//还有几小时
      scope.minute = Math.floor((lefttime - scope.day * scope.oneday - 3600 * scope.hour) / 60);//还有几小时
      scope.second = lefttime - scope.day * scope.oneday - 3600 * scope.hour - 60 * scope.minute;//还有几秒

      if(!scope.showDay) scope.hour += scope.day*24;
      if(!scope.showHour) scope.minute += scope.hour*60;
      if(!scope.showMinute) scope.second += scope.minute*60;

      scope.str = '';
      scope.str = theme.replace('D', fillZeroPrefix(scope.day));
      scope.str = scope.str.replace('H', fillZeroPrefix(scope.hour));
      scope.str = scope.str.replace('M', fillZeroPrefix(scope.minute));
      scope.str = scope.str.replace('S', fillZeroPrefix(scope.second));
      obj.html( scope.str );

      scope.count++;

      scope.countdown(lefttime, obj, theme, cb);
    }, scope.nextTime);
  }
};