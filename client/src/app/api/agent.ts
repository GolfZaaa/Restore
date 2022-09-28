import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from '../..';
import { PaginatedResponse } from "../models/pagination";



axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true

const ResponseBody = (response: AxiosResponse) => response.data;

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

axios.interceptors.response.use(async (response) => {
    await sleep();
    
    const pagination = response.headers['pagination']; //ส่งมาจาก ProductController
    if (pagination) {
        response.data = new PaginatedResponse(response.data, JSON.parse(pagination));
        return response;
    }

    return response;
  },
  (error: AxiosError) => {
    var data = error.response?.data; // obj ไม่รู้ชนิด
    var json = JSON.stringify(data);
    var result = JSON.parse(json);


    switch (result.status) {
      case 400:
        if (result.errors) { 
          const modelStateErrors: string[] = []; 
          for (const key in result.errors) { 
              if (result.errors[key]) { 
                  modelStateErrors.push(result.errors[key]) 
              } 
          } 
          throw modelStateErrors.flat(); 
      } 
        toast(result.title);
        break;
      case 401:
        toast(result.title);
        break;
      case 404:
        toast(result.title);
        break;
        case 500:
          history.push('/Server-Error',{state:data})
          toast(result.title);
          break;

      default:
        break;
    }
  }
);


const requests = {
  get: (url: string, params?: URLSearchParams) => axios.get(url, {params}).then(ResponseBody),
  post: (url: string,body:{}) => axios.post(url,body).then(ResponseBody),
  delete: (url: string) => axios.delete(url).then(ResponseBody),

};
// catalog.list() เรียกใช้ได้เลย
const catalog = {
  list: (params: URLSearchParams) => requests.get('products', params),
  details: (id: number) => requests.get(`products/${id}`),
  fetchFilters: () => requests.get('products/filters'),
};

const TestError = {
  get400Error: () => requests.get("buggy/GetBadRequest"),
  get401Error: () => requests.get("buggy/GetUnAuthorized"),
  get404Error: () => requests.get("buggy/GetNotFound"),
  get500Error: () => requests.get('buggy/GetServerError'), 
  getValidationError: () => requests.get('buggy/GetValidationError')
};

const Basket = {
  get :()=>requests.get('basket'),
  addItem: (productId:number,quantity= 1)=>requests.post(`basket?productId=${productId}&quantity=${quantity}`,{}),
  removeItem: (productId:number,quantity= 1)=>requests.delete(`basket?productId=${productId}&quantity=${quantity}`)

}

const agent = {
  catalog,
  TestError,
  Basket
};

export default agent;

// axios("http://localhost:5000/api/Products")
//   .then((response: any) => setProduct(response.data))
//   .catch((error) => console.log(error));
