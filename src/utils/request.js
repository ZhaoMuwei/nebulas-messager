const req = options => {
    const $ = window.$

    return new Promise((resolve, reject) => {
        const $window = $(window)
        $window.off('message')
        $window.on('message', e => {
            try {
                const data = e.data.data
                console.log('数据返回：', data)
                switch(options.method) {
                    case 'neb_call' :
                        const response = data[options.method]
                        if (response && response.execute_err) {
                            reject(response.execute_err)
                            return
                        }
                        if (response) {
                            resolve(response)
                            return
                        }
                        return

                    case 'neb_sendTransaction':
                        if (data.txhash) {
                            resolve(data)
                        }
                        return
                    default:
                        return
                }
            }
            catch(error) {
                reject(error)
            }
        })

        window.postMessage(
            {
                target: 'contentscript',
                ...options,
            },
            "*"
        )
    })
}

export default req
