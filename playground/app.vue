<template>
  <div>
    <ul>
      <li>Pure icon: <nuxt-icon name="fire" /></li>
      <li class="colored">
        Icon with color from text: <nuxt-icon name="fire" />
      </li>
      <li>Icon with defs: <nuxt-icon name="css3" fill /> <nuxt-icon name="javascript" fill /></li>
      <li>Subfolder icons: <nuxt-icon name="UserBadge" /> User, <nuxt-icon name="AdminBadge" /> Admin, <nuxt-icon name="AdminFormBug" /></li>

      <li>
        <w-input start="1111">
          <template #start>
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-auto">
              <svg
                class="absolute text-gray-400 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </template>
          <template #end>
            <div>1231231</div>
          </template>
        </w-input>
      </li>
    </ul>
  </div>
</template>

<style>
.colored{
  color: orange;
}
</style>
