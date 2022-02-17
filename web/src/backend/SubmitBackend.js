import {attackRequest} from "./request";
import qs from "qs";

const SubmitBackend = {
  submitModel() {
    return attackRequest({
      url: `/`
    })
  }
}
