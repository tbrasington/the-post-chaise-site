export default function resolveProductionUrl(document) {

  const remoteUrl = `https://thepostchaise.com`
  const localUrl = `http://localhost:4200`

  const baseUrl = window.location.hostname === 'localhost' ? localUrl : remoteUrl
  const previewSecret = process.env.SANITY_STUDIO_PREVIEW_SECRET
  const docType = document._type
  
  const previewUrl = new URL(baseUrl)


  previewUrl.pathname = `/api/preview`
 // previewUrl.searchParams.append(`secret`, previewSecret) // need to re-do this and add the env to the next app hidden in the vercel env
  previewUrl.searchParams.append(`type`, docType)
  previewUrl.searchParams.append(`slug`, encodeURIComponent(document?.slug?.current) ?? `/`)
  return previewUrl.toString()



  //return `http://localhost:4200/api/preview?type=${document._type}&slug=${document.slug.current}&secret=${process.env.SANITY_STUDIO_PREVIEW_SECRET}`
}