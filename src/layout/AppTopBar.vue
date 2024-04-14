<script setup>
</script>

<template>
  <div class="card">
    <Menubar style="height: 5rem">
      <template #start>
        <img
          src="../../public/Check24.png"
          alt="Imagen"
          height="40"
          class="h-3rem"
        />
      </template>
      <template #end>
        <div class="flex align-items-center gap-2">
          <Avatar
            image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
            shape="circle"
          />
        </div>
      </template>
    </Menubar>
  </div>
</template>

