let Promise = {
  //全部成功才可以，遇见失败就直接失败
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
              resolve(result)
            }
          },
          (err) => {
            //return Promise.reject()
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
  any() {

  },
  allSettled() {

  },
  race() {

  },
  try() {

  },
  withResolvers() {

  },
}