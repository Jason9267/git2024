let Promise = {
  //全部成功才成功，遇见失败直接失败
  all(promises) {
    return new Promise((resolve, reject) => {
      let result = []
      //防止数组中间变化
      let len = promises.length
      let successCount = 0
      //判空
      if (promises.length === 0) {
        resolve(result)
      }
      promises.forEach((element, index) => {
        //传入的可能不是promise，用Promise.resolve()统一为Promise
        Promise.resolve(element).then(
          (res) => {
            result[index] = res
            successCount++
            if (successCount === len) {
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
  allSettled(promises) {
    return new Promise((resolve, reject) => {
      let result = []
      let Count = 0
      promises.forEach((element, index) => {
        Promise.resolve(element).then(
          (res) => {
            Count++
            //resolve(res)不能在这里写，会直接确定最外层Promise的状态，并且状态不会变化，然后直接结束
            result[index] = { status: 'fulfilled', value: res }
            if (Count === promises.length) {
              resolve(result)
            }
          },
          (err) => {
            Count++
            result[index] = { status: 'rejected', reason: err }
            if (Count === promises.length) {
              resolve(result)
            }
          }
        )
      })
    })
  },
  //有一个执行完毕即可
  race(promises) {
    return new Promise((resolve, reject) => {
      promises.forEach((element, index) => {
        Promise.resolve(element).then(
          (res) => {
            resolve(res)
          },
          (err) => {
            reject(err)
          }
        )
      })
    })
  },
  //抛出一个函数的错误
  try(fn) {
    return new Promise((resolve, reject) => {
      resolve(fn())
    })
  },
  withResolvers() {
    let resolve, reject
    let promise = new Promise((res, rej) => {
      resolve = res
      reject = rej
    })
    return { promise, resolve, reject }
  },
  //收尾工作
  finally(callback) {
    return this.then(
      (value) => {
        return Promise.resolve(callback()).then(
          () => value
        )
      },
      (reason) => {
        return Promise.resolve(callback()).then(
          () => { throw reason }
        )
      }
    )
  },
}