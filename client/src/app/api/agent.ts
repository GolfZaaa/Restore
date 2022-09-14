import axios, { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { history } from '../..';



axios.defaults.baseURL = "http://localhost:5000/api/";

const ResponseBody = (response: AxiosResponse) => response.data;

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

axios.interceptors.response.use(
  async (response) => {
    await sleep();
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

function Test(){
  let navigate = useNavigate();

  navigate("/Server-Error")
}

const requests = {
  get: (url: string) => axios.get(url).then(ResponseBody),
};
// catalog.list() เรียกใช้ได้เลย
const catalog = {
  list: () => requests.get("Products"),
  details: (id: number) => requests.get(`products/${id}`),
};

const TestError = {
  get400Error: () => requests.get("buggy/GetBadRequest"),
  get401Error: () => requests.get("buggy/GetUnAuthorized"),
  get404Error: () => requests.get("buggy/GetNotFound"),
  get500Error: () => requests.get('buggy/GetServerError'), 
  getValidationError: () => requests.get('buggy/GetValidationError')
};

const agent = {
  catalog,
  TestError,
};

export default agent;

// axios("http://localhost:5000/api/Products")
//   .then((response: any) => setProduct(response.data))
//   .catch((error) => console.log(error));
