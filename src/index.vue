<template>
  <div>
    <nav class="weui-flex" id="nav" :class='{active:tab==2}'>
        
        <div class="weui-flex__item item" >
            <a @click='tab=1'>库存表</a>
        </div>
        <div class="weui-flex__item item" >
            <a @click='tab=2'>明细表</a>
        </div>
        <div class="search-wrap">
            <a href="javascript:;" @click="formShow=true"><i class="icon search"></i></a>
        </div>
      </nav>
    <search-layer 
    :show="formShow"  @close="onCloseLayer">
</search-layer>
  </div>

</template>

<script>
import searchLayer from 'components/searchLayer';
export default {
components:{
    searchLayer
},
data(){
    return {
        formShow:false,
        tab:1

    }
},
methods:{
    onCloseLayer(){
      this.formShow=false;
    }
}

}
</script>

<style lang='scss'>
#nav{position: absolute;width: 100%;top: 0 ;background: #f2f2f2;z-index: 999;padding: 0.1rem 0;border-bottom: 1px solid #fff;
    &:after {content:"";position: absolute;left: 0;bottom: -1px;width: 37%;height: 2px;background: #1CAF9A;transition: left 0.2s ease-in;}
    &.active:after {left: 37%;}
    
    a {color: #666;font-size: 0.18rem;}
    .item {text-align: center;
      
    }
    .search-wrap {width: 26%;padding-right: 0.2rem;box-sizing: border-box;text-align: right;}
}
.icon { display: inline-block;background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAABgCAQAAADxhTn7AAAE50lEQVR42sWZzXHbOBTHH0iM97jqINoKFksVIKYCMxWYvngmpzAVmKlAvGXGF8kVrFKB6AKsIBVE6UA+rmdM7AOoL1IECEDSBB6PZIr+/8iH90lRMCzGwjHEMBCMDNSBUvCqhB98BdaL6j4Y3YicDOv3ZHswJnGYAUSz6pGXJwBGn0QOA7I/8CI4DMm77Z8kDdMRf7vl3APAhuEUr1S9Fz9gVvH9tbJBGIsYEoVi4fcoX35xBDAWLKC29+Nb3rY1X8Mcf7IohVxCSD6K3z7gUVuAlJfbKX5VqcnGyxnMopzcy10JF+y9CUEbPvNdvfmG8uu+W1/mbB6W8Ceayoige/sG/9ameU7t/INzFm8QU/jQC8CT0CnF0zK19/EdIhklz3MjgKFvSHesEnBanEcZmeKFTVnZbaYNILxXbpn12/54w6OUjMkgyCDXAvD6Y+n16B0eq0rDn/hyYwDI8JdeDV6Lr6InvIdh9z4ogBhj5L7otslizWCMKjF0A1idK/3loZqjDwIZa0wUxOouuD+Ar6WRgOn2QOWe6gQAXv1KGonFxwlGAtQdwPoUgFiRvkjmJ92BRbJj7DIICeDSfpsqcBGAsn4wPGmTaw/inYCqVJmInbTJMlShK5PRHfcaMl/5Tah+05ioDhMy7PJiuxWoGiLmei9SuSRMwQvABphJZaiWWgDmkgLr0g2b+dxDkCkDPXb3e3STSwrZI4QT+MfD/qpYveXGQFvmUUL+BhYVy8zNPDKPov2/6PrVXSRXWbhAf/4Ucfu6hvIL6d5YC/PeVMHL6FaWbzKNwA6xlcdVWDVey9kolv6AiHH1ua/8szhQjY5aE0xk3KJ1fE5HoBBpkIyy50et+DC4Jwf9E/YUsrvjFs3vcxqVBF0WHQ+7T5jjHND6N3YdJOSoOdMj6HGfw8pgJusrjh9ZmEVrwmEtCyomtMGmONUzQ1EVQYm+Z0TQrjYEYrRwXhdxokRJs+N7gXnd3ON5PQjNCIURHaOlExw2GMb4Pmv+IqUoq/nWBfi6D0FNDRW6X6FyDdthOzoKM4LaNCXmJGhGUDjDMiHOAjAhzgRQiCTkW4fYI84GkE6xmXcaiDMCDkaqA8RZAceIcHJmQBsB8dkBTYR4ugCgRgQFGYunKr0IQPXq8VkDzeOB1NkB08F/E3Vb5R+fbz2nna/DYCJYU4Nu5V9/bp7Lpa/Jw/s7j2HkgYnF5jkZakz/qhEbwGtxMIAMxMIdUcvvNVAxPTTRdeNsZ0RLXk0MzT1oD4lOiGN5FCQNgCjJtS+iS15udBOQkfiwuNsjNPIvV1kD8HH1EIvSHaGTJ3HLTQHuuDtCL3/XVfRdETbyrVThgrCTP8pFtghb+Y5kZ4Owl+/Mpn0IF3lNujYhMGYc5LX1QI/ofC6jlTcUHB2i41SDvLGiaRBO8j0l0wLRI99bk3sQvfIWRd+AsJC37SqEw1FXgCasrOsF9Za3RNAT5K0Q9CR5CwR1LYb461T1qGsxlB2IC4K611q3wkrda61b7aY+pdwFQf1KuT2C+si7IKifvD2C+srbIuh2+HGXNyNaEw4pfORNiNaE0/EtnpW8HtE34VjL6xCtCQfm9ZcMPvIaRHPCucpek93HzvIdiPaEc7ueDnFb1CB+lfkN4nf8KyOF+sLrQGMXB3ggPfWxwccVJL/vWcWl1v+dHfsvPrKTogAAAABJRU5ErkJggg=='); }
.search { width: 24px; height: 24px; background-position: 0 0; -moz-background-size: 24px auto; -o-background-size: 24px auto; -webkit-background-size: 24px auto; background-size: 24px auto; }
.close { width: 24px; height: 24px; background-position: 0 -24px; -moz-background-size: 24px auto; -o-background-size: 24px auto; -webkit-background-size: 24px auto; background-size: 24px auto; }

</style>
