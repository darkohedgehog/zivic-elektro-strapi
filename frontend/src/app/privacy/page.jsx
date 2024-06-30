import CookiesStatement from '@/components/privacy/CookiesStatement'
import Privacy from '@/components/privacy/Privacy'
import TermsOfUse from '@/components/privacy/TermsOfUse'
import React from 'react'

const PrivacyPage = () => {
  return (
    <>
      <Privacy />
      <CookiesStatement />
      <TermsOfUse />
    </>
  )
}

export default PrivacyPage