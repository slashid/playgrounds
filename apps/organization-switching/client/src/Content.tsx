import { LoggedIn, LoggedOut, useOrganizations, useSlashID } from "@slashid/react"
import { ThemeRoot } from "@slashid/ui"
import { uiTheme } from "./app.css"
import { Layout } from "./components/layout"
import MobileFallback from "./components/mobile-fallback"
import { Dashboard } from "./views/dashboard"
import { Login } from "./views/login"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Loading } from "./components/loading"

export const Content = () => {
  const navigate = useNavigate()
  const { isLoading, isAuthenticated } = useSlashID()
  const { switchOrganization, currentOrganization, organizations } = useOrganizations()
  const { orgId } = useParams()

  const [
    firstTimeRedirectComplete,
    setFirstTimeRedirectComplete
  ] = useState<"no" | "in_progress" | "yes">("no")

  useEffect(() => {
    if (firstTimeRedirectComplete !== "no") return
    if (isLoading) return
    if (!isAuthenticated || (isAuthenticated && !orgId)) setFirstTimeRedirectComplete("yes")
  }, [isLoading, isAuthenticated, orgId, firstTimeRedirectComplete])
  
  useEffect(() => {
    if (isLoading) return
    if (firstTimeRedirectComplete === "in_progress" || firstTimeRedirectComplete === "yes") return

    const orgs = organizations
    if (!orgs) return

    if (orgId && orgs.some(org => org.id === orgId)) {
      switchOrganization({ oid: orgId })
      setFirstTimeRedirectComplete("in_progress")
    }
  }, [isLoading, firstTimeRedirectComplete, orgId, organizations, switchOrganization])

  useEffect(() => {
    if (isLoading) return
    if (firstTimeRedirectComplete !== "in_progress") return
    if (orgId === currentOrganization?.id) setFirstTimeRedirectComplete("yes")
  }, [isLoading, firstTimeRedirectComplete, orgId, currentOrganization?.id])

  useEffect(() => {
    if (isLoading) return
    if (firstTimeRedirectComplete !== "yes") return

    const oid = currentOrganization?.id
    if (!oid || oid === orgId) return

    navigate(`/${oid}`)
  }, [isLoading, currentOrganization, firstTimeRedirectComplete, navigate, orgId, organizations, switchOrganization])

  if (firstTimeRedirectComplete !== "yes") {
    return (
      <ThemeRoot theme="light" className={uiTheme}>
        <MobileFallback />
        <Layout>
          <Loading />
        </Layout>
      </ThemeRoot>
    )
  }

  return (
    <ThemeRoot theme="light" className={uiTheme}>
      <MobileFallback />
      <Layout>
        <LoggedIn>
          <Dashboard />
        </LoggedIn>
        <LoggedOut>
          <Login />
        </LoggedOut>
      </Layout>
    </ThemeRoot>
  )
}