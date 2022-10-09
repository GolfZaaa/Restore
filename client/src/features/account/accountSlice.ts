import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../../App/models/User";
import { history } from "../..";
import agent from "../../App/api/agent";
import { setBasket } from "../basket/basketSlice";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";

interface AccountState {
    user: User | null;
}

const initialState: AccountState = {
    user: null
}

//FieldValues พารามิเตอร์รับหลายค่าที่ส่งเข้ามา เช่น await dispatch(signInUser(data));
export const signInUser = createAsyncThunk<User,FieldValues>(
    'account/SignInUser',
    async (data, thunkAPI) => {
        try {
            const userDto = await agent.Account.login(data);
            const {basket, ...user} = userDto;
            if (basket) thunkAPI.dispatch(setBasket(basket));
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

export const fetchCurrentUser = createAsyncThunk<User>(
    'account/fetchCurrentUser',
    async ( _ , thunkAPI) => {
        //ใช้ thunkAPI เรียก action กรณีอยู่ภายใน slice
        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)))
        try {
            const userDto = await agent.Account.currentUser()
            const {basket, ...user} = userDto;
            if (basket) thunkAPI.dispatch(setBasket(basket));
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    },
    {
        condition: () => {
            if (!localStorage.getItem('user')) return false;  // ไม่ไปทำ Network request
        }
    }
)

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        signOut: (state) => {
            state.user = null;
            localStorage.removeItem('user');
            history.push('/')
        },
        setUser: (state, action) => {
            //ดึงเฉพาะ Roles จาก Token
            let claims = JSON.parse(window.atob(action.payload.token.split('.')[1]));
            let roles = claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            //ตรวจสอบกรณีมีหลาย Roles = ["Menber","Admin"]
            state.user = {...action.payload, roles: typeof(roles) === 'string' ? [roles] : roles};
        }

    },
    extraReducers: (builder => {
        builder.addCase(fetchCurrentUser.rejected, (state) => {
            state.user = null;
            localStorage.removeItem('user');
            toast.error('Session expired - please login again');
            history.push('/');
        });
        builder.addMatcher(isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled), (state, action:any) => {
            //ดึงเฉพาะ Roles จาก Token
            let claims = JSON.parse(window.atob(action.payload.token.split('.')[1]));
            let roles = claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            //ตรวจสอบกรณีมีหลาย Roles = ["Menber","Admin"]
            state.user = {...action.payload, roles: typeof(roles) === 'string' ? [roles] : roles};
        });

        builder.addMatcher(isAnyOf(signInUser.rejected), (state, action) => {
           throw action.payload;
        });
        
    })

})

export const {signOut,setUser} = accountSlice.actions

export default accountSlice.reducer
