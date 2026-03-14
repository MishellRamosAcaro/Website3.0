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
            <div class="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1">
              <div>
                <label for="profile-country-code" class="block text-sm font-medium text-text-primary">
                  Country code
                </label>
                <InputText
                  id="profile-country-code"
                  v-model="profileForm.countryCode"
                  type="text"
                  placeholder="+34"
                  autocomplete="tel-country-code"
                  class="mt-1 w-full min-h-8 bg-bg-0 border-white/10 text-text-primary"
                  :invalid="Boolean(profileErrors.countryCode)"
                  :disabled="profileLoading"
                />
                <p v-if="profileErrors.countryCode" class="mt-1 text-sm text-red-400" role="alert">
                  {{ profileErrors.countryCode }}
                </p>
              </div>
              <div>
                <label for="profile-phone" class="block text-sm font-medium text-text-primary">
                  Phone number
                </label>
                <InputText
                  id="profile-phone"
                  v-model="profileForm.phoneNumberNormalized"
                  type="tel"
                  placeholder="34612345678"
                  autocomplete="tel-national"
                  class="mt-1 w-full min-h-8 bg-bg-0 border-white/10 text-text-primary"
                  :invalid="Boolean(profileErrors.phoneNumberNormalized)"
                  :disabled="profileLoading"
                />
                <p v-if="profileErrors.phoneNumberNormalized" class="mt-1 text-sm text-red-400" role="alert">
                  {{ profileErrors.phoneNumberNormalized }}
                </p>
              </div>
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
              class=" text-amber-400 hover:bg-amber-500/10"
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
              class=" text-red-400 hover:bg-red-500/10"
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
import type { MeResponse, UpdateProfilePayload } from '@/lib/api/auth'
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
  countryCode: '',
  phoneNumberNormalized: '',
})
const profileLoading = ref(false)
const profileError = ref('')
const profileErrors = reactive<Record<string, string>>({})
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
    profileForm.countryCode = me.country_code ?? ''
    profileForm.phoneNumberNormalized = me.phone_number_normalized ?? ''
  }
}

onMounted(() => {
  loadUser()
})

async function submitProfile() {
  profileError.value = ''
  Object.keys(profileErrors).forEach((k) => delete profileErrors[k])
  profileSuccess.value = false
  const parsed = profileFormSchema.safeParse({
    email: profileForm.email || undefined,
    firstName: profileForm.firstName || undefined,
    lastName: profileForm.lastName || undefined,
    countryCode: profileForm.countryCode || undefined,
    phoneNumberNormalized: profileForm.phoneNumberNormalized || undefined,
  })
  if (!parsed.success) {
    const flat = parsed.error.flatten().fieldErrors
    if (flat.email) profileErrors.email = flat.email[0] ?? ''
    if (flat.firstName) profileErrors.firstName = flat.firstName[0] ?? ''
    if (flat.lastName) profileErrors.lastName = flat.lastName[0] ?? ''
    if (flat.countryCode) profileErrors.countryCode = flat.countryCode[0] ?? ''
    if (flat.phoneNumberNormalized) profileErrors.phoneNumberNormalized = flat.phoneNumberNormalized[0] ?? ''
    profileError.value = flat.email?.[0] ?? flat.firstName?.[0] ?? flat.lastName?.[0] ?? flat.countryCode?.[0] ?? flat.phoneNumberNormalized?.[0] ?? 'Please fix the errors above.'
    return
  }
  const data = parsed.data
  const payload: UpdateProfilePayload = {}
  if (data.email) payload.email = data.email
  if (data.firstName) payload.first_name = data.firstName
  if (data.lastName) payload.last_name = data.lastName
  if (data.countryCode) payload.country_code = data.countryCode
  if (data.phoneNumberNormalized) payload.phone_number_normalized = data.phoneNumberNormalized
  if (Object.keys(payload).length === 0) {
    profileError.value = 'Change at least one field.'
    return
  }
  profileLoading.value = true
  try {
    const result = await updateProfile(payload)
    if (result.ok) {
      profileSuccess.value = true
      const emailToVerify = result.email ?? profileForm.email
      if (result.email_pending_verification && emailToVerify) {
        authStore.logout()
        try {
          await logout()
        } catch {
          // Cookies already cleared by backend; ignore logout API failure
        }
        router.push({
          path: '/verify-email',
          query: { email: emailToVerify, message: 'Verify your new email to sign in again.' },
        })
        return
      }
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
