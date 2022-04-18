import axios from "axios"
import { DOMAIN } from "../../util/Settings/config"
import { SET_DATA_BANNER } from "../types/type-constant"
import { manageFilmnServie } from "../../Services/ManageFilmService"
export const getCarouselAction = (params)=>{
        return async (dispatche)=>{
            try {
                const {data} = await manageFilmnServie.getbBannerService()
                console.log(data)
                dispatche({
                  type:SET_DATA_BANNER,
                  data:data.content
                }) 
              } catch (err) {
                  console.log(err)
              }
        }
}