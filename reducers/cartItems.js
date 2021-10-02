import Items from "../models/Items"


const cartItems=(state=[],action)=>{
    switch(action.type)
    {
        case 'ADD_TO_CART':
        return[...state,action.payload]
        case 'REMOVE':
            return state.filter(cartItems=>cartItems._id!=action.payload._id)
    }
    return state
}



// const cartItems=(state=[],action)=>{
//     switch(action.type)
//     {
//         case 'ADD_TO_CART':
//             // let updateOrAdditems;
//             const addProduct=action.payload
            
//             if(state[addProduct._id]){
//                 const updateProduct=new Items(
                    
//                     state[addProduct._id].quantity+1,addProduct
//                 )
//                 return {
//                     ...state,
//                 [addProduct._id]:updateProduct  
//                 }
//             }else{
//                 const newItems= new Items(1,addProduct)
//                 return{...state,[addProduct._id]:newItems}
//             }
        
//         case 'REMOVE':
//             return state.filter(cartItems=>cartItems._id!=action.product._id)
//     }
//     return state
// }
export default cartItems