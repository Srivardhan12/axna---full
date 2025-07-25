import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { SIGNUP } from "@/redux/actions"
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';

type state = {
  user: object
}

export type signup = {
  username?: string,
  email?: string,
  password?: string
}


export function SignupComponent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate()
  const storedUser = useSelector((state: state) => state.user)
  console.log(storedUser)
  const dispatch = useDispatch()
  const [user, setUser] = useState<signup>({})
  const handleSubmit = () => {
    // @ts-expect-error wasted my 30 mins here
    const [status, message] = dispatch(SIGNUP(user))
    if (status === true) {
      navigate("/signup")
    } else {
      console.log(message)
    }
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your AXNA account
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="username">Username</Label>
                <Input id="username" type="text" required placeholder="axna" onChange={(e) => { setUser({ ...user, username: e.target.value }) }} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="axna@example.com"
                  required
                  onChange={(e) => { setUser({ ...user, email: e.target.value }) }}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" autoComplete="on" required placeholder="********" onChange={(e) => { setUser({ ...user, password: e.target.value }) }} />
              </div>
              <Button type="submit" className="w-full cursor-pointer">
                Sign Up
              </Button>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/signin" className="underline underline-offset-4">
                  Sign in
                </Link>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="https://images.quiz-maker.com/images/edd82578-223c-416c-f2e3-b2173acf6d00/public"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

