import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { toast } from 'sonner'
import { authService } from '@/services/auth'
import { RegisterPayload } from '@/types'

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const register = async (data: RegisterPayload) => {
    setIsLoading(true)
    try {
      await authService.register(data)

      toast.success('สมัครสมาชิกสำเร็จ กำลังเข้าสู่ระบบ!')

      const signInResult = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      })

      if (signInResult?.error) {
        toast.error('ระบบขัดข้อง กรุณาลองใหม่อีกครั้ง')
        router.push('/login')
      } else {
        router.push('/')
        router.refresh()
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('เกิดข้อผิดพลาดในการเชื่อมต่อ')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return { register, isLoading }
}
