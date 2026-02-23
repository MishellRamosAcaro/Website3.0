<template>
  <div class="min-h-screen">
    <TopBar />
    <main class="container-content py-14">
      <div class="mx-auto max-w-6xl">
        <h1 class="font-serif text-h2 font-bold text-text-primary">
          Profile
        </h1>

        <div class="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <!-- Section 1: Personal info -->
        <section class="card-base p-6 space-y-4">
          <h2 class="font-serif text-lg font-semibold text-text-primary">
            Personal information
          </h2>
          <form
            novalidate
            class="space-y-4"
            @submit.prevent="submitProfile"
          >
            <div>
              <label for="profile-email" class="block text-sm font-medium text-text-primary">
                Email
              </label>
              <InputText
                id="profile-email"
                v-model="profileForm.email"
                type="email"
                autocomplete="email"
                class="mt-1 w-full min-h-8 bg-bg-0 border-white/10 text-text-primary"
                :invalid="Boolean(profileError)"
                :disabled="profileLoading"
              />
              <p v-if="profileError" class="mt-1 text-sm text-red-400" role="alert">
                {{ profileError }}
              </p>
            </div>
            <div>
              <label for="profile-firstName" class="block text-sm font-medium text-text-primary">
                First name
              </label>
              <InputText
                id="profile-firstName"
                v-model="profileForm.firstName"
                class="mt-1 w-full min-h-8 bg-bg-0 border-white/10 text-text-primary"
                :disabled="profileLoading"
              />
            </div>
            <div>
              <label for="profile-lastName" class="block text-sm font-medium text-text-primary">
                Last name
              </label>
              <InputText
                id="profile-lastName"
                v-model="profileForm.lastName"
                class="mt-1 w-full min-h-8 bg-bg-0 border-white/10 text-text-primary"
                :disabled="profileLoading"
              />
            </div>
            <Button
              type="submit"
              label="Save changes"
              class="btn-primary"
              :loading="profileLoading"
              :disabled="profileLoading"
            />
            <p v-if="profileSuccess" class="text-sm text-green-400" role="status">
              Profile updated.
            </p>
          </form>
        </section>

        <!-- Section 2: Security (password) -->
        <section class="card-base p-6 space-y-4">
          <h2 class="font-serif text-lg font-semibold text-text-primary">
            Security
          </h2>
          <form
            novalidate
            class="space-y-4"
            @submit.prevent="submitPassword"
          >
            <div>
              <label for="pw-current" class="block text-sm font-medium text-text-primary">
                Current password
              </label>
              <InputText
                id="pw-current"
                v-model="passwordForm.currentPassword"
                type="password"
                autocomplete="current-password"
                class="mt-1 w-full min-h-8 bg-bg-0 border-white/10 text-text-primary"
                :invalid="Boolean(passwordErrors.currentPassword)"
                :disabled="passwordLoading"
              />
              <p v-if="passwordErrors.currentPassword" class="mt-1 text-sm text-red-400" role="alert">
                {{ passwordErrors.currentPassword }}
              </p>
            </div>
            <div>
              <label for="pw-new" class="block text-sm font-medium text-text-primary">
                New password
              </label>
              <InputText
                id="pw-new"
                v-model="passwordForm.newPassword"
                type="password"
                autocomplete="new-password"
                class="mt-1 w-full min-h-8 bg-bg-0 border-white/10 text-text-primary"
                :invalid="Boolean(passwordErrors.newPassword || passwordErrors.confirmPassword)"
                :disabled="passwordLoading"
              />
              <p v-if="passwordErrors.newPassword" class="mt-1 text-sm text-red-400" role="alert">
                {{ passwordErrors.newPassword }}
              </p>
            </div>
            <div>
              <label for="pw-confirm" class="block text-sm font-medium text-text-primary">
                Confirm new password
              </label>
              <InputText
                id="pw-confirm"
                v-model="passwordForm.confirmPassword"
                type="password"
                autocomplete="new-password"
                class="mt-1 w-full min-h-8 bg-bg-0 border-white/10 text-text-primary"
                :invalid="Boolean(passwordErrors.confirmPassword)"
                :disabled="passwordLoading"
              />
              <p v-if="passwordErrors.confirmPassword" class="mt-1 text-sm text-red-400" role="alert">
                {{ passwordErrors.confirmPassword }}
              </p>
            </div>
            <Button
              type="submit"
              label="Change password"
              class="btn-primary"
              :loading="passwordLoading"
              :disabled="passwordLoading"
            />
            <p v-if="passwordSubmitError" class="text-sm text-red-400" role="alert">
              {{ passwordSubmitError }}
            </p>
          </form>
        </section>

        <!-- Section 3: Danger zone -->
        <section class="card-base p-6 space-y-4 border-red-500/30">
          <h2 class="font-serif text-lg font-semibold text-red-400">
            Danger zone
          </h2>

          <div class="space-y-3">
            <p class="text-sm text-text-secondary">
              Deactivating your account will log you out on all devices. You will not be able to sign in until the account is reactivated.
            </p>
            <Button
              label="Deactivate account"
              severity="secondary"
              class="border border-amber-500/50 text-amber-400 hover:bg-amber-500/10"
              :loading="deactivateLoading"
              :disabled="deactivateLoading || deleteLoading"
              @click="confirmDeactivate"
            />
          </div>

          <div class="pt-4 border-t border-white/10 space-y-3">
            <p class="text-sm text-text-secondary">
              Deleting your account will permanently remove your profile, uploaded files, and all associated data. This cannot be undone.
            </p>
            <Button
              label="Delete account"
              severity="danger"
              class="border border-red-500/50 text-red-400 hover:bg-red-500/10"
              :disabled="deactivateLoading || deleteLoading"
              @click="showDeleteModal = true"
            />
          </div>
        </section>
        </div>
      </div>
    </main>
    <Footer />

    <!-- Delete account modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
      @keydown.escape="showDeleteModal = false"
    >
      <div
        class="card-base w-full max-w-md p-6 space-y-4"
        @click.stop
      >
        <h2 id="delete-dialog-title" class="font-serif text-lg font-semibold text-red-400">
          Delete account
        </h2>
        <p class="text-sm text-text-secondary">
          Enter your current password to confirm. All your data will be permanently deleted.
        </p>
        <div>
          <label for="delete-password" class="block text-sm font-medium text-text-primary">
            Password
          </label>
          <InputText
            id="delete-password"
            v-model="deleteForm.password"
            type="password"
            autocomplete="current-password"
            class="mt-1 w-full min-h-8 bg-bg-0 border-white/10 text-text-primary"
            :invalid="Boolean(deleteError)"
            :disabled="deleteLoading"
            @keydown.enter.prevent="submitDelete"
          />
          <p v-if="deleteError" class="mt-1 text-sm text-red-400" role="alert">
            {{ deleteError }}
          </p>
        </div>
        <div class="flex gap-3 justify-end">
          <Button
            label="Cancel"
            severity="secondary"
            :disabled="deleteLoading"
            @click="showDeleteModal = false"
          />
          <Button
            label="Delete my account"
            severity="danger"
            :loading="deleteLoading"
            :disabled="deleteLoading || !deleteForm.password"
            @click="submitDelete"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import TopBar from '@/components/layout/TopBar.vue'
import Footer from '@/components/layout/Footer.vue'
import {
  getMe,
  updateProfile,
  updatePassword,
  deactivateAccount,
  deleteAccount,
  logout,
} from '@/lib/api/auth'
import { useAuthStore } from '@/stores/auth'
import type { MeResponse } from '@/lib/api/auth'
import {
  profileFormSchema,
  passwordChangeSchema,
  deleteAccountSchema,
} from '@/lib/validation/auth'

const router = useRouter()
const authStore = useAuthStore()

const user = ref<MeResponse | null>(null)

const profileForm = reactive({
  email: '',
  firstName: '',
  lastName: '',
})
const profileLoading = ref(false)
const profileError = ref('')
const profileSuccess = ref(false)

const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})
const passwordLoading = ref(false)
const passwordErrors = reactive<Record<string, string>>({})
const passwordSubmitError = ref('')

const deactivateLoading = ref(false)
const showDeleteModal = ref(false)
const deleteForm = reactive({ password: '' })
const deleteLoading = ref(false)
const deleteError = ref('')

async function loadUser() {
  const me = await getMe()
  user.value = me
  if (me) {
    profileForm.email = me.email
    profileForm.firstName = me.first_name
    profileForm.lastName = me.last_name
  }
}

onMounted(() => {
  loadUser()
})

async function submitProfile() {
  profileError.value = ''
  profileSuccess.value = false
  const parsed = profileFormSchema.safeParse({
    email: profileForm.email || undefined,
    firstName: profileForm.firstName || undefined,
    lastName: profileForm.lastName || undefined,
  })
  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors
    profileError.value = first.email?.[0] ?? first.firstName?.[0] ?? first.lastName?.[0] ?? 'Please fix the errors above.'
    return
  }
  const data = parsed.data
  const payload: { email?: string; first_name?: string; last_name?: string } = {}
  if (data.email) payload.email = data.email
  if (data.firstName) payload.first_name = data.firstName
  if (data.lastName) payload.last_name = data.lastName
  if (Object.keys(payload).length === 0) {
    profileError.value = 'Change at least one field.'
    return
  }
  profileLoading.value = true
  try {
    const result = await updateProfile(payload)
    if (result.ok) {
      profileSuccess.value = true
      await loadUser()
    } else {
      profileError.value = result.error ?? 'Update failed.'
    }
  } finally {
    profileLoading.value = false
  }
}

async function submitPassword() {
  passwordSubmitError.value = ''
  Object.assign(passwordErrors, { currentPassword: '', newPassword: '', confirmPassword: '' })
  const parsed = passwordChangeSchema.safeParse(passwordForm)
  if (!parsed.success) {
    const flat = parsed.error.flatten().fieldErrors
    if (flat.currentPassword) passwordErrors.currentPassword = flat.currentPassword[0] ?? ''
    if (flat.newPassword) passwordErrors.newPassword = flat.newPassword[0] ?? ''
    if (flat.confirmPassword) passwordErrors.confirmPassword = flat.confirmPassword[0] ?? ''
    return
  }
  passwordLoading.value = true
  try {
    const result = await updatePassword({
      current_password: passwordForm.currentPassword,
      new_password: passwordForm.newPassword,
    })
    if (result.ok) {
      authStore.logout()
      await logout()
      router.push({ path: '/', query: { message: 'Password updated. Please log in again.' } })
      return
    }
    passwordSubmitError.value = result.error ?? 'Failed to change password.'
  } finally {
    passwordLoading.value = false
  }
}

function confirmDeactivate() {
  if (!window.confirm('Deactivate your account? You will be logged out on all devices.')) return
  deactivateLoading.value = true
  deactivateAccount()
    .then((result) => {
      if (result.ok) {
        authStore.logout()
        return logout()
      }
    })
    .then(() => {
      router.push({ path: '/', query: { message: 'Account deactivated.' } })
    })
    .finally(() => {
      deactivateLoading.value = false
    })
}

async function submitDelete() {
  deleteError.value = ''
  const parsed = deleteAccountSchema.safeParse(deleteForm)
  if (!parsed.success) {
    deleteError.value = parsed.error.flatten().fieldErrors.password?.[0] ?? 'Password is required.'
    return
  }
  deleteLoading.value = true
  try {
    const result = await deleteAccount({ password: deleteForm.password })
    if (result.ok) {
      authStore.logout()
      await logout()
      showDeleteModal.value = false
      router.push({ path: '/', query: { message: 'Your account has been deleted.' } })
      return
    }
    deleteError.value = result.error ?? 'Failed to delete account.'
  } finally {
    deleteLoading.value = false
  }
}
</script>
