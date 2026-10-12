


<template>
  <!-- RAIL & PANE SYSTEM
       Kerangka khusus untuk kebutuhan produktivitas/pengelolaan aplikasi. -->
  <div class="dashboard-layout">
    <!-- RAIL: Navigasi samping yang posisinya terkunci (fixed) -->
    <aside class="dashboard-rail">
      <div class="rail-brand">
        <router-link to="/">Gatherly Organizer</router-link>
      </div>

      <nav class="rail-nav">
        <router-link to="/dashboard" class="rail-link active">
          Overview
        </router-link>
        <a href="#" class="rail-link">My Events</a>
        <a href="#" class="rail-link">Attendees</a>
        <a href="#" class="rail-link">QR Check-in</a>
      </nav>

      <div class="rail-footer">
        <router-link to="/" class="rail-link">
          &larr; Back to Public
        </router-link>
      </div>
    </aside>

    <!-- PANE: Area utama yang dapat di-scroll secara mandiri -->
    <main class="dashboard-pane">
      <header class="pane-header">
        <h1>Dashboard</h1>
        <div class="user-profile">Admin</div>
      </header>

      <div class="pane-content">
        <router-view />
      </div>
    </main>
  </div>
</template>

<style scoped>
.dashboard-layout {
  display: flex;
  height: 100vh;
  /* Mengunci agar web tidak bisa di-scroll secara global */
  overflow: hidden;
}

.dashboard-rail {
  width: 260px;
  /* Sidebar statis ditaruh tetap */
  display: flex;
  flex-direction: column;
  background: #2f2b55;
  color: white;
  padding: var(--space-6);
  flex-shrink: 0;
}

.rail-brand {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: var(--space-8);
}

.rail-brand a {
  color: white;
  text-decoration: none;
}

.rail-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.rail-link {
  display: block;
  color: #d6d3f0;
  padding: var(--space-3);
  border-radius: var(--space-2);
  text-decoration: none;
}

.rail-link:hover,
.rail-link.active,
.rail-link.router-link-exact-active {
  background: var(--primary);
  color: white;
}

.rail-footer {
  margin-top: auto;
}

.dashboard-pane {
  flex: 1;
  overflow-y: auto;
  background: var(--bg-gray);
  padding: var(--space-8);
  min-width: 0;
}

.pane-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-8);
}

.pane-header h1 {
  margin: 0;
}

.user-profile {
  background: white;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--space-6);
}
</style>
