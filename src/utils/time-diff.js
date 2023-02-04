const TimeDiff = postDay => {
  let posted = new Date(postDay); 
  let diff = new Date().getTime() - posted.getTime();
  let progress = new Date(diff);

  if(progress.getUTCFullYear() < 1970) {
    return '0秒前';
  } else if (progress.getUTCFullYear() - 1970) {
    return progress.getUTCFullYear() - 1970 + '年前';
  } else if (progress.getUTCMonth()) {
    return progress.getUTCMonth() + 'ヶ月前';
  } else if (progress.getUTCDate() - 1) {
    return progress.getUTCDate() - 1 + '日前';
  } else if (progress.getUTCHours()) {
    return progress.getUTCHours() + '時間前';
  } else if (progress.getUTCMinutes()) {
    return progress.getUTCMinutes() + '分前';
  } else {
    return progress.getUTCSeconds() + '秒前';
  }
}

export default TimeDiff;