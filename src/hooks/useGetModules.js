import { useMoralis } from "react-moralis"
const useGetPostModules = () => {
    const {account} = useMoralis()
    
    const getPostModules = ( referalFee ,selectedPostModule, postPermission, selectedCurrency, postPrice, collectLimit) => {
        const parsedReferral = parseFloat(referalFee)
        if(selectedPostModule === "freeCollectModule"){
            const collectModule  = {
              freeCollectModule : {
                followerOnly : postPermission
             }
            }
            return collectModule
        }else if(selectedPostModule === "feeCollectModule"){
         const  collectModule  = {
            feeCollectModule : {
              amount: {
                currency : selectedCurrency,
                 value : postPrice,
              },
              recipient : account,
              referralFee : parsedReferral,
              followerOnly : postPermission,
      
            }
          }
      
          return collectModule  
        }else if(selectedPostModule  === "limitedFeeCollectModule"){
          const collectModule = {
            limitedFeeCollectModule : {
              collectLimit : collectLimit,
              amount: {
                currency : selectedCurrency,
                 value : postPrice,
              },
              recipient : account,
              referralFee : parsedReferral,
              followerOnly : postPermission,
            }
          }
          return collectModule
        }else if(selectedPostModule === "limitedTimedFeeCollectModule"){
          const collectModule = {
            limitedTimedFeeCollectModule : {
              collectLimit : collectLimit,
              amount: {
                currency : selectedCurrency,
                 value : postPrice,
              },
              recipient : account,
              referralFee : parsedReferral,
              followerOnly : postPermission,
            }
          }
          return collectModule
        }else if(selectedPostModule  === "timedFeeCollectModule"){
          const collectModule = {
            timedFeeCollectModule : {
              amount: {
                currency : selectedCurrency,
                 value : postPrice,
              },
              recipient : account,
              referralFee : parsedReferral,
              followerOnly : postPermission,
      
            }
          }
          return collectModule
        }
      }
      
        // GET_REFRENCE MODULE
      
          const getPostRefrenceModule = (postRefrence) => {
            if(postRefrence  === "true"){
              const refrenceModule = {
                referenceModule : {
                  followerOnlyReferenceModule : true,
                }
              }
               return refrenceModule
            }else if(postRefrence === "false"){
              const refrenceModule = {
                referenceModule : {
                  followerOnlyReferenceModule : false,
                }
              }
              return refrenceModule
            }
            }

          return {getPostModules, getPostRefrenceModule}  
}
export default useGetPostModules