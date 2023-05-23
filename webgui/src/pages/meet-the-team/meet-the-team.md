---
title: Meet the Team
desc: The list of people behind Quasar Framework.
keys: Team
components:
  - ./TeamMember
scope:
  core:
  - name: Matthias Unverzagt
    role: Lead Dev & Architect
    avatar:  /matthias.png
    email: matthias.unverzagt@enpasos.com
    github: enpasos
    desc: Architecture and Development
  - name: Katharina Unverzagt
    role: Project Organization
    avatar:  /katharina.png
    github: enpasos
    email: katharina.unverzagt@enpasos.com
    desc: Project Organization
---


### Team

<div class="row items-stretch q-gutter-sm">
  <team-member
    v-for="m in scope.core"
    :key="m.name"
    :name="m.name"
    :role="m.role"
    :avatar="m.avatar"
    :email="m.email"
    :twitter="m.twitter"
    :github="m.github"
    :desc="m.desc"
  />
</div>


