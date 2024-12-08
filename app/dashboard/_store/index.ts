import { create } from 'zustand'
import { getUserData } from '../_actions/userActions'
import { User } from '@/types/User'


const userStore = create((set) => ({
  user: {} as User,
  setUser(user: User) {
    set({ user })
  },
}))
