import { createAuthClient } from "better-auth/vue";

const authClient = createAuthClient();

export const useAuthStore = defineStore("useAuthStore", () => {
  const session = ref<Awaited<ReturnType<typeof authClient.useSession>> | null>(null);

  const user = computed(() => session.value?.data?.user);
  const loading = computed(() => session.value?.isPending);

  async function init() {
    const data = await authClient.useSession(useFetch);
    session.value = data;
  }

  async function signIn() {
    const { csrf, headerName } = useCsrf();
    const headers = new Headers();
    headers.append(headerName, csrf);
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
      errorCallbackURL: "/error",
      fetchOptions: {
        headers,
      },
    });
  }

  async function signOut() {
    const { csrf, headerName } = useCsrf();
    const headers = new Headers();
    headers.append(headerName, csrf);
    await authClient.signOut({
      fetchOptions: {
        headers,
      },
    });
    navigateTo("/");
  }

  return {
    user,
    loading,
    init,
    signIn,
    signOut,
  };
});
