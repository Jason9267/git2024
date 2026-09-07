let Promise = {
  //全部成功才成功，遇见失败直接失败
  all(promises) {
    return new Promise((resolve, reject) => {
      let result = []
      let successCount = 0
      promises.forEach((element, index) => {
        Promise.resolve(element).then(
          (res) => {
            result[index] = res
            successCount++
            if (successCount === promises.length) {
              //全部成功才成功，返回全部的成功
              resolve(result)
            }
          },
          (err) => {
            //return Promise.reject()
            //遇见失败直接失败，返回失败的那一个
            reject(err)
          }
        )
      })
      // 异步代码肯定还没执行，successCount还没变化，所以把判断放进异步代码里面
      // if(successCount === promises.length) {
      //   改变return新建Promise的状态，而不是返回再次新建的Promise
      //   return Promise.resolve(result)
      // }
    })
  },
  //遇见成功直接成功，全部失败才失败
  any(promises) {
    return new Promise((resolve, reject) => {
      let result = []
      let faileCount = 0
      promises.forEach((element, index) => {
        Promise.resolve(element).then(
          (res) => {
            //遇见成功直接成功，返回成功的那一个
            resolve(res)
          },
          (err) => {
            result[index] = err
            faileCount++
            if (faileCount === promises.length) {
              //全部失败才失败，返回全部的失败
              reject(result)
            }
          }
        )
      })
    })
  },
  //全部执行完毕即可
  allSettled() {

  },
  race() {

  },
  try() {

  },
  withResolvers() {

  },
}