import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, LogIn, User } from "lucide-react";
import { useEffect } from "react";
import { Form, useActionData, redirect, useNavigation } from "react-router-dom";
import type { ActionFunction } from "react-router-dom";
import backgroud from "@/assets/login-bg.jpg";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  console.log(formData);
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return redirect("/");
};

const Login = () => {
  const { state } = useNavigation();
  const loginResponse = useActionData();

  useEffect(() => {
    if (loginResponse) alert("ha");
  }, [loginResponse]);

  return (
    <div className="antialiased relative min-h-screen flex justify-center font-comfortaa">
      <img
        src={backgroud}
        className="absolute w-full h-full object-center object-cover"
      />
      <div className="z-10 w-full max-w-lg mx-3 my-auto sm:m-auto p-8 rounded bg-gray-100 bg-opacity-90">
        <h1 className="text-3xl mb-3 rounded">Login</h1>
        <Form method="post" className="w-full">
          <div className="mb-3 relative">
            <User className="absolute w-6 top-1/2 transform -translate-y-1/2 left-1 text-slate-700" />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              className="ps-7 border-slate-500"
            />
          </div>
          <div className="mb-3 relative">
            <Lock className="absolute w-6 top-1/2 transform -translate-y-1/2 left-1 text-slate-700" />
            <Input
              type="password"
              name="password"
              placeholder="Senha"
              className="ps-7 border-slate-500"
            />
          </div>
          <Button
            className="w-full"
            type="submit"
            disabled={state === "submitting"}
          >
            <LogIn className="h-6 w-6 mr-2" />
            Entrar
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
