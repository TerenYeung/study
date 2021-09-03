const utils = {
  show(list) {
    let ret = '';
    for (list.front(); list.curPos() < list.size(); list.next()) {
      ret += ' ' + list.getCurNode().value;
    }

    console.log(ret);
    return ret;
  }
}

module.exports = utils;