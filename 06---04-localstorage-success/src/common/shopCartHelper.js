/**
 * 这个文件就是用来对localStorage中的数据进行增、删、查
 */

/**
 * 参数格式 {goodsId:87,count:2} 
 *          {goodsId:89,count:1}
 */
const key = "goodslist"

//保存我们点击的商品到localStorage中
export function addGoods(goodsObj){
    //第一次 localStorage.getItem(key) 为null
    const goodsArray = JSON.parse(localStorage.getItem(key) || '[]')
    //最终存储是这样 [{"goodsId":"89",count:2},{"goodsId":3,count:3}]

    goodsArray.push(goodsObj)

    //写回去
    localStorage.setItem(key,JSON.stringify(goodsArray))
}

//从localStorage中读取我们现在的商品总数，用在购物车的徽标上面
export function getGoodsCount(){
    var totalCount = 0
    //第一次 localStorage.getItem(key) 为null
    const goodsArray = JSON.parse(localStorage.getItem(key) || '[]')

    goodsArray.forEach(function(item){
        totalCount += parseInt(item.count)
    })

    return totalCount
}

//返回商品js数组
export function getGoodsArray(){
    return JSON.parse(localStorage.getItem(key) || '[]')
}

//根据goodsId删除localStorage中的数据
export function deleteGoods(goodsId){
    //1.先把所有的数据拿出来
    const goodsArray = JSON.parse(localStorage.getItem(key) || '[]')

    //2.删除localStorage中goodsId等于传递进来的goodsId
    for(var i=goodsArray.length -1 ;i>=0 ;i--){
        if(parseInt(goodsId) == parseInt(goodsArray[i].goodsId)){
            goodsArray.splice(i,1)
        }
    }

    //3.将删除之后剩余的，覆盖写入回去
    //写回去
    localStorage.setItem(key,JSON.stringify(goodsArray))
}