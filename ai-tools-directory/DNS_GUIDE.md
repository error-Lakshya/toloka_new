# DNS Setup Guide (Vercel)

1) Add Domain to Vercel
- In Vercel Dashboard -> Projects -> Settings -> Domains -> Add your domain.

2) Configure DNS records (Registrar)
- If using Vercel-managed DNS: follow prompts to delegate nameservers.
- If using your own registrar DNS (e.g., Cloudflare/Namecheap):
  - Recommended (www root):
    - CNAME for `www` -> cname.vercel-dns.com
  - Apex/root domain (example.com): choose one:
    - A record to Vercel edge IPs (subject to change; prefer CNAME flattening via Cloudflare)
    - Or set up redirect from apex to www via registrar/Cloudflare

3) Verify
- In Vercel, check domain status; once DNS propagates, HTTPS certificate will be issued automatically.

4) Common issues
- Conflicting existing A/AAAA records; remove/replace them per Vercel docs.
- Slow propagation; wait and re-verify.
- Ensure no CDN misconfiguration breaks Next.js routes.

References
- https://vercel.com/docs/projects/domains
